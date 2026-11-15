import { Chart } from 'chart.js';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import {
  ConfiguracoesService,
  Tema,
  KpiVisibilidade
} from '../../services/services/configuracoes';

import { PerfilService } from '../../services/perfilservice/perfil.service';
import { AuthService } from '../../services/userservices/auth.service';

@Component({
  selector: 'app-custom',
  standalone: true,
  imports: [],
  templateUrl: './custom.html',
  styleUrl: './custom.css'
})

export class CustomComponent implements OnChanges {

  @Input() aberto: boolean = false;

  @Output() fechar = new EventEmitter<void>();

  temaSelecionado: Tema = 'claro';

  notificacoesAtivas: boolean = true;

  frequenciaNotificacao: string = 'diaria';

  salvando: boolean = false;

  erroNotificacao: string = '';

  kpisSelecionados: KpiVisibilidade = {
    totalTuristas: true,
    viaAerea: true,
    viaTerrestre: true,
    viaMaritima: true,
    viaFluvial: true,
    paisesEmissores: true
  };

  constructor(
    public configuracoes: ConfiguracoesService,
    private authService: AuthService,
    private perfilService: PerfilService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['aberto'] && this.aberto) {
      this.carregarRascunho();
    }
  }

  carregarRascunho() {
    this.temaSelecionado = this.configuracoes.tema;


    this.kpisSelecionados = {
      ...this.configuracoes.kpis
    };

    const dados = localStorage.getItem('preferencias');

    if (dados) {

      const resposta = JSON.parse(dados);

      const preferencias = resposta.preferencias;

     if (preferencias) {

          this.notificacoesAtivas =
             Boolean(preferencias.notificacoesAtivas);

          this.frequenciaNotificacao =
              preferencias.frequencia || 'diaria';

     }

    }
  }

  selecionarTema(tema: Tema) {
    this.temaSelecionado = tema;
  }

  alterarKpi(chave: keyof KpiVisibilidade, event: Event) {
    const checkbox = event.target as HTMLInputElement;

    this.kpisSelecionados[chave] = checkbox.checked;
  }

  salvar() {

    const usuario = this.authService.getToken();

    if (!usuario || !usuario.id) {
        this.erroNotificacao = 'Usuário não identificado.';
        return;
    }

    this.salvando = true;
    this.erroNotificacao = '';

    this.perfilService.salvarNotificacoes(
        usuario.id,
        this.notificacoesAtivas,
        this.frequenciaNotificacao
    ).subscribe({

        next: () => {

            this.configuracoes.salvarPreferencias(
                this.temaSelecionado,
                this.kpisSelecionados
            );

            localStorage.setItem(
                'preferencias',
                JSON.stringify({
                    preferencias: {
                        notificacoesAtivas: this.notificacoesAtivas,
                        frequencia: this.frequenciaNotificacao
                    }
                })
            );

            this.salvando = false;

            this.fechar.emit();

        },

        error: (erro) => {

            console.error('Erro ao salvar notificações:', erro);

            this.erroNotificacao =
                'Não foi possível salvar as configurações.';

            this.salvando = false;

        }

    });

}

  cancelar() {
    this.fechar.emit();
  }

  alterarNotificacoes(event: Event) {

    const checkbox = event.target as HTMLInputElement;

    this.notificacoesAtivas = checkbox.checked;

}

alterarFrequencia(event: Event) {

    const select = event.target as HTMLSelectElement;

    this.frequenciaNotificacao = select.value;

}

  
}

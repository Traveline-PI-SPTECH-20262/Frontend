import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { ConfiguracoesService, Tema, KpiVisibilidade } from '../../services/services/configuracoes';
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
  salvando = false;
  carregando = false;
  preferenciasCarregadas = false;
  erroNotificacao = '';
  kpisSelecionados: KpiVisibilidade = {
    totalTuristas: true, viaAerea: true, viaTerrestre: true,
    viaMaritima: true, viaFluvial: true, paisesEmissores: true
  };

  constructor(
    public configuracoes: ConfiguracoesService,
    private authService: AuthService,
    private perfilService: PerfilService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['aberto'] && this.aberto) this.carregarRascunho();
  }

  carregarRascunho() {
    const usuario = this.authService.getToken();
    this.erroNotificacao = '';
    if (!usuario?.id) {
      this.erroNotificacao = 'Usuário não identificado.';
      return;
    }
    this.preferenciasCarregadas = false;
    this.carregando = true;
    this.perfilService.getPreferencias(usuario.id).subscribe({
      next: (dados) => {
        this.preferenciasCarregadas = true;
        this.temaSelecionado = 'escuro';
        if (dados.temaClaro) this.temaSelecionado = 'claro';
        this.kpisSelecionados = {
          totalTuristas: Boolean(dados.totalTuristas),
          viaAerea: Boolean(dados.viaAerea),
          viaTerrestre: Boolean(dados.viaTerrestre),
          viaMaritima: Boolean(dados.viaMaritima),
          viaFluvial: Boolean(dados.viaFluvial),
          paisesEmissores: Boolean(dados.paisesEmissores)
        };
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar preferências:', erro);
        this.erroNotificacao = 'Não foi possível carregar as configurações.';
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }

  selecionarTema(tema: Tema) { this.temaSelecionado = tema; }
  alterarKpi(chave: keyof KpiVisibilidade, event: Event) {
    this.kpisSelecionados[chave] = (event.target as HTMLInputElement).checked;
  }

  salvar() {
    const usuario = this.authService.getToken();
    if (!usuario?.id) {
      this.erroNotificacao = 'Usuário não identificado.';
      return;
    }
    if (this.carregando || this.salvando || !this.preferenciasCarregadas) return;
    this.salvando = true;
    this.erroNotificacao = '';
    this.perfilService.salvarPreferencias(
      usuario.id, this.temaSelecionado === 'claro', this.kpisSelecionados
    ).subscribe({
      next: () => {
        this.configuracoes.salvarPreferencias(this.temaSelecionado, this.kpisSelecionados);
        this.authService.salvarPreferencias(JSON.stringify({
          preferencias: {
            temaClaro: this.temaSelecionado === 'claro',
            ...this.kpisSelecionados
          }
        }));
        this.salvando = false;
        this.fechar.emit();
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao salvar preferências:', erro);
        this.erroNotificacao = 'Não foi possível salvar as configurações.';
        this.salvando = false;
        this.cdr.detectChanges();
      }
    });
  }

  cancelar() { this.fechar.emit(); }
}

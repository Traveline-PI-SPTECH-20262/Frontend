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
  TamanhoFonte,
  KpiVisibilidade
} from '../../services/services/configuracoes';

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

  fonteSelecionada: TamanhoFonte = 'media';

  kpisSelecionados: KpiVisibilidade = {
    totalTuristas: true,
    viaAerea: true,
    viaTerrestre: true,
    viaMaritima: true,
    viaFluvial: true,
    paisesEmissores: true
  };

  constructor(
    public configuracoes: ConfiguracoesService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['aberto'] && this.aberto) {
      this.carregarRascunho();
    }
  }

  carregarRascunho() {
    this.temaSelecionado = this.configuracoes.tema;

    this.fonteSelecionada = this.configuracoes.tamanhoFonte;

    this.kpisSelecionados = {
      ...this.configuracoes.kpis
    };
  }

  selecionarTema(tema: Tema) {
    this.temaSelecionado = tema;
  }

  selecionarFonte(event: Event) {
    const valor = (event.target as HTMLSelectElement).value;

    this.fonteSelecionada = valor as TamanhoFonte;
  }

  alterarKpi(chave: keyof KpiVisibilidade, event: Event) {
    const checkbox = event.target as HTMLInputElement;

    this.kpisSelecionados[chave] = checkbox.checked;
  }

  salvar() {
    this.configuracoes.salvarPreferencias(
      this.temaSelecionado,
      this.fonteSelecionada,
      this.kpisSelecionados
    );

    this.fechar.emit();
  }

  cancelar() {
    this.fechar.emit();
  }
}

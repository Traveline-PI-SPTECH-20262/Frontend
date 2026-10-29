import { Component } from '@angular/core';
import { LineChart } from '../../charts/line-chart/line-chart';
import { BarChart } from '../../charts/bar-chart/bar-chart';
import { DoughnutChart } from '../../charts/doughnut-chart/doughnut-chart';
import { BarStandingChart } from '../../charts/bar-standing-chart/bar-standing-chart';
import { KpiCard } from '../../kpi-card/kpi-card';
import { Header } from '../../header/header';
import { Modal } from '../../modal/modal';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [
    LineChart,
    KpiCard,
    Header,
    BarChart,
    DoughnutChart,
    BarStandingChart,
    Modal,
    FormsModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class Dashboard {
  modalAberto = false;
  graficoSelecionado = '';

  // Filtros antigos
  periodoContinente = '2019-2021';
  paisSelecionado = '';
  periodoPaises = '2019-2021';
  ufSelecionada = '';
  periodoUf = '2019-2021';
  anoSazonalidade = 'todos';
  mesSazonalidade = 'todos';

  // Novos filtros
  anoSelecionado = 'todos';
  regiaoSelecionada = 'todas';
  metricaSelecionada = 'chegadas';
  mesSelecionado = 'todos';

  subRegioesSelecionadas: string[] = [];

  opcoesSubRegioes = [
    'África',
    'Europa',
    'Ásia',
    'América do Norte',
    'América do Sul',
    'Oceania',
    'Reino Unido'
  ];

  filtrosAplicados: any = null;

  abrirFiltros(grafico: string): void {
    this.graficoSelecionado = grafico;
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
  }

  alternarSubRegiao(regiao: string, evento: Event): void {
    const marcado = (evento.target as HTMLInputElement).checked;

    if (marcado && !this.subRegioesSelecionadas.includes(regiao)) {
      this.subRegioesSelecionadas = [
        ...this.subRegioesSelecionadas,
        regiao
      ];
    } else if (!marcado) {
      this.subRegioesSelecionadas =
        this.subRegioesSelecionadas.filter(item => item !== regiao);
    }
  }

  aplicarFiltros(): void {
    this.filtrosAplicados = {
      grafico: this.graficoSelecionado,
      ano: this.anoSelecionado,
      regiao: this.regiaoSelecionada,
      metrica: this.metricaSelecionada,
      mes: this.mesSelecionado,
      pais: this.paisSelecionado,
      uf: this.ufSelecionada,
      subRegioes: this.subRegioesSelecionadas
    };

    console.log('Filtros aplicados:', this.filtrosAplicados);
    this.fecharModal();
  }
}
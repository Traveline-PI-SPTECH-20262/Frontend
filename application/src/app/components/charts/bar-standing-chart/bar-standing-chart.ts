import { Component, Input, OnChanges } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-bar-standing-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './bar-standing-chart.html',
  styleUrl: './bar-standing-chart.css',
})
export class BarStandingChart implements OnChanges {
  @Input() anoFiltro = 'todos';
  @Input() regiaoFiltro = 'todas';
  @Input() ufFiltro = '';
  @Input() metricaFiltro = 'chegadas';

  private dadosOriginais = [
    { uf: 'SP', regiao: 'Sudeste', valor: 12500 },
    { uf: 'RJ', regiao: 'Sudeste', valor: 85400 },
    { uf: 'MG', regiao: 'Sudeste', valor: 9800 },
    { uf: 'RS', regiao: 'Sul', valor: 54200 },
    { uf: 'PR', regiao: 'Sul', valor: 145000 },
    { uf: 'SC', regiao: 'Sul', valor: 112000 },
    { uf: 'BA', regiao: 'Nordeste', valor: 95000 },
    { uf: 'GO', regiao: 'Centro-Oeste', valor: 43000 },
    { uf: 'PE', regiao: 'Nordeste', valor: 67000 },
    { uf: 'CE', regiao: 'Nordeste', valor: 38000 }
  ];

  chartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { autoSkip: false }
      }
    }
  };

  chartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [{
      label: 'Chegadas',
      data: [],
      backgroundColor: '#8c62f7',
      borderRadius: 4
    }]
  };

  chartType: ChartConfiguration<'bar'>['type'] = 'bar';

  ngOnChanges(): void {
    let dados = [...this.dadosOriginais];

    if (this.regiaoFiltro !== 'todas') {
      dados = dados.filter(item => item.regiao === this.regiaoFiltro);
    }

    if (this.ufFiltro.trim()) {
      dados = dados.filter(item =>
        item.uf.toLowerCase().includes(this.ufFiltro.trim().toLowerCase())
      );
    }

    this.chartData = {
      labels: dados.map(item => item.uf),
      datasets: [{
        label: this.metricaFiltro === 'receita' ? 'Receita' : 'Chegadas',
        data: dados.map(item => {
          let valor = item.valor;

          if (this.anoFiltro === '2020') valor *= 0.6;
          if (this.anoFiltro === '2021') valor *= 0.8;
          if (this.metricaFiltro === 'receita') valor *= 150;

          return Math.round(valor);
        }),
        backgroundColor: '#8c62f7',
        borderRadius: 4
      }]
    };
  }
}
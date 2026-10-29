import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './line-chart.html',
  styleUrl: './line-chart.css',
})
export class LineChart implements OnChanges {
  @Input() anoFiltro = 'todos';
  @Input() mesFiltro = 'todos';
  @Input() metricaFiltro = 'chegadas';

  private meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril',
    'Maio', 'Junho', 'Julho', 'Agosto',
    'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  private valoresOriginais = [
    2500, 1800, 1500, 2500, 1800, 1500,
    2500, 1800, 2500, 1000, 2000, 1250
  ];

  chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: { grid: { display: true } },
      y: { grid: { display: true } }
    }
  };

  chartData: ChartConfiguration<'line'>['data'] = {
    labels: this.meses,
    datasets: [{
      label: 'Chegadas de turistas por mês',
      data: this.valoresOriginais,
      backgroundColor: '#351486',
      borderColor: '#8c62f7'
    }]
  };

  chartType: ChartConfiguration<'line'>['type'] = 'line';

  ngOnChanges(): void {
    let dados = this.meses.map((mes, indice) => ({
      mes,
      numeroMes: String(indice + 1),
      valor: this.valoresOriginais[indice]
    }));

    // Filtra pelo mês selecionado no modal
    if (this.mesFiltro !== 'todos') {
      dados = dados.filter(item => item.numeroMes === this.mesFiltro);
    }

    this.chartData = {
      labels: dados.map(item => item.mes),
      datasets: [{
        label: this.metricaFiltro === 'receita'
          ? 'Receita por mês'
          : 'Chegadas de turistas por mês',
        data: dados.map(item => {
          let valor = item.valor;

          // Valores simulados para cada ano
          if (this.anoFiltro === '2020') valor *= 0.6;
          if (this.anoFiltro === '2021') valor *= 0.8;

          // Soma simulada dos três anos
          if (this.anoFiltro === 'todos') valor *= 2.4;

          // Converte chegadas em receita estimada
          if (this.metricaFiltro === 'receita') valor *= 150;

          return Math.round(valor);
        }),
        backgroundColor: '#351486',
        borderColor: '#8c62f7'
      }]
    };
  }
}
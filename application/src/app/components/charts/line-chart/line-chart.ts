import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ BaseChartDirective ],
  templateUrl: './line-chart.html',
  styleUrl: './line-chart.css',
})
export class LineChart {
  chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'x',
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: { grid: { display: true } },
      y: { 
        grid: { display: true }, 
        }
    }
  };
  chartLabels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  chartData: ChartConfiguration<'line'>['data'] = {
    labels: this.chartLabels,
    datasets: [{
      label: 'Chegadas de turistas por mês',
      data: [2500, 1800, 1500, 2500, 1800, 1500, 2500, 1800, 2500, 1000, 2000, 1250],
      backgroundColor: '#351486',
      borderColor:'#8c62f7', 
    }]
  };

  chartType: ChartConfiguration<'line'>['type'] = 'line';
}

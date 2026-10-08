import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ BaseChartDirective ],
  templateUrl: './bar-chart.html',
  styleUrl: './bar-chart.css',
})
export class BarChart {
  chartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: { grid: { display: false },
      ticks: {
          autoSkip: false 
        } }
    }
  };
  chartLabels = ['Argentina', 'Estados Unidos', 'Chile', 'Paraguai', 'Uruguai', 'França', 'Alemanha', 'Portugal', 'Reino Unido', 'Itália'];

  chartData: ChartConfiguration<'bar'>['data'] = {
    labels: this.chartLabels,
    datasets: [{
      label: 'Países Emissores',
      data: [2500, 1800, 1500, 2500, 1800, 1500, 2500, 1800, 2500, 1000],
      backgroundColor: '#8c62f7',
      borderRadius: 4
    }]
  };

  chartType: ChartConfiguration<'bar'>['type'] = 'bar';
}

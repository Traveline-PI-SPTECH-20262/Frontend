import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-bar-standing-chart',
  imports: [BaseChartDirective],
  templateUrl: './bar-standing-chart.html',
  styleUrl: './bar-standing-chart.css',
})
export class BarStandingChart {
  chartOptions: ChartConfiguration<'bar'>['options'] = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: { grid: { display: false },
        ticks: {
            autoSkip: false 
          } }
      }
    };
    chartLabels = ['SP', 'RJ', 'MG', 'RS', 'PR', 'SC', 'BA', 'GO', 'PE', 'CE'];
  
    chartData: ChartConfiguration<'bar'>['data'] = {
      labels: this.chartLabels,
      datasets: [{
        data: [12500, 85400, 9800, 54200, 145000, 112000, 95000, 43000, 67000, 38000],
        backgroundColor: '#8c62f7',
        borderRadius: 4
      }]
    };
  
    chartType: ChartConfiguration<'bar'>['type'] = 'bar';
}

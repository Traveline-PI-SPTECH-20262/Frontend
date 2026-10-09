import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-doughnut-chart',
  imports: [BaseChartDirective],
  templateUrl: './doughnut-chart.html',
  styleUrl: './doughnut-chart.css',
})
export class DoughnutChart {
    chartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: {position: 'right',},
    }
  };
  chartLabels = [
  "África",
  "América",
  "Ásia",
  "Europa",
  "Oceania"
];

  chartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: this.chartLabels,
    datasets: [{
      label: 'Países Emissores',
      data: [2500, 1800, 1500, 2500, 1800],
      backgroundColor: ['#8c62f7','#caf762','#12c335','#de1717','#d61ebb','#090610','#7f4c21','#36a6ce'],
      borderRadius: 4
    }]
  };

  chartType: ChartConfiguration<'doughnut'>['type'] = 'doughnut';
}
    

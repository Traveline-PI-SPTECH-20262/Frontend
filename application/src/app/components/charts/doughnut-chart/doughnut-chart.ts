import { Component, Input } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-doughnut-chart',
  imports: [BaseChartDirective],
  templateUrl: './doughnut-chart.html',
  styleUrl: './doughnut-chart.css'
})
export class DoughnutChart {
  @Input() chartData: ChartConfiguration<'doughnut'>['data'] = { labels: [], datasets: [] };
  chartType: ChartConfiguration<'doughnut'>['type'] = 'doughnut';
  chartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim(),
    
    plugins: { legend: { position: 'right' } },
    
  };
}

import { Component, Input } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  imports: [BaseChartDirective],
  templateUrl: './line-chart.html',
  styleUrl: './line-chart.css'
})
export class LineChart {
  @Input() chartData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  chartType: ChartConfiguration<'line'>['type'] = 'line';
  chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim(),
    
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: true, color: getComputedStyle(document.documentElement).getPropertyValue('--graph-line').trim() }, ticks: { autoSkip: false, precision: 0 }, beginAtZero: true },
      y: { grid: { display: true, color: getComputedStyle(document.documentElement).getPropertyValue('--graph-line').trim() }, ticks: { autoSkip: false, precision: 0 }, beginAtZero: true }
    }
  };
}

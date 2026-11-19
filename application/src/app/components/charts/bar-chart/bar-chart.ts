import { Component, Input } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  imports: [BaseChartDirective],
  templateUrl: './bar-chart.html',
  styleUrl: './bar-chart.css'
})
export class BarChart {
  @Input() chartData: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  chartType: ChartConfiguration<'bar'>['type'] = 'bar';
  chartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim(),
    indexAxis: 'y',
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: true, color: getComputedStyle(document.documentElement).getPropertyValue('--graph-line').trim() }, ticks: { autoSkip: false, precision: 0 }, beginAtZero: true },
      y: { grid: { display: false, color: getComputedStyle(document.documentElement).getPropertyValue('--graph-line').trim() }, ticks: { autoSkip: false, precision: 0 }, beginAtZero: true }
    }
  };
}

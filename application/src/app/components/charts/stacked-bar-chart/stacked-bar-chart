import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-stacked-bar-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './stacked-bar-chart.html',
  styleUrl: './stacked-bar-chart.css',
})
export class StackedBarChart {
  @Input() chartData: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };

  chartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'bottom' }
    },
    scales: {
      x: { stacked: true, grid: { display: false } },
      y: { stacked: true }
    }
  };

  chartType: ChartConfiguration<'bar'>['type'] = 'bar';
}
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './line-chart.html',
  styleUrl: './line-chart.css',
  template: `<canvas id="lineChart" [data]="chartData" [labels]="chartLabels" [type]="chartType"></canvas>`,
})
export class LineChart {
  chartData = [0, 10, 5, 2, 20, 30, 45];
  chartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  chartType = 'line';
}

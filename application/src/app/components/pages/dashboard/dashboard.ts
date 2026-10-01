import { Component } from '@angular/core';
import { LineChart } from '../../charts/line-chart/line-chart';

@Component({
  selector: 'app-dashboard',
  imports: [LineChart],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  
}
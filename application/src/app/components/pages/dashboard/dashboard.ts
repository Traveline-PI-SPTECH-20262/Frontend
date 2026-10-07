import { Component } from '@angular/core';
import { LineChart } from '../../charts/line-chart/line-chart';
import { KpiCard } from '../../kpi-card/kpi-card';

@Component({
  selector: 'app-dashboard',
  imports: [LineChart,KpiCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  
}
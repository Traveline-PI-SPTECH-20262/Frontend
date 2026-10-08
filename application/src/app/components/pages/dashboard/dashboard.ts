import { Component } from '@angular/core';
import { LineChart } from '../../charts/line-chart/line-chart';
import { KpiCard } from '../../kpi-card/kpi-card';
import { Header } from '../../header/header';

@Component({
  selector: 'app-dashboard',
  imports: [LineChart,KpiCard,Header],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  
}
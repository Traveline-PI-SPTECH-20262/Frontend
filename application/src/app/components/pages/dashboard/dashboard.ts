import { Component } from '@angular/core';
import { LineChart } from '../../charts/line-chart/line-chart';
import {BarChart} from '../../charts/bar-chart/bar-chart';
import {DoughnutChart} from '../../charts/doughnut-chart/doughnut-chart';
import {BarStandingChart} from '../../charts/bar-standing-chart/bar-standing-chart';
import { KpiCard } from '../../kpi-card/kpi-card';
import { Header } from '../../header/header';

@Component({
  selector: 'app-dashboard',
  imports: [LineChart,KpiCard,Header,BarChart,DoughnutChart,BarStandingChart],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  
}
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './bar-chart.html',
  styleUrl: './bar-chart.css',
})
export class BarChart {

  coresContinentes: Record<string, string> = {
    'América': '#1c9b5f',
    'Europa': '#de1717',
    'África': '#8c62f7',
    'Ásia': '#f59e0b',
    'Oceania': '#ec4899'
  };

  continentesPaises: Record<string, string> = {
    'Argentina': 'América',
    'Estados Unidos': 'América',
    'Chile': 'América',
    'França': 'Europa',
    'Alemanha': 'Europa',
    'Portugal': 'Europa',
    'Japão': 'Ásia',
    'China': 'Ásia',
    'África do Sul': 'África',
    'Austrália': 'Oceania'
  };

  chartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        grid: { display: false },
        ticks: {
          autoSkip: false
        }
      }
    }
  };

  chartLabels = [
    'Argentina',
    'França',
    'Japão',
    'Estados Unidos',
    'África do Sul',
    'Alemanha',
    'China',
    'Chile',
    'Austrália',
    'Portugal'
  ];

  chartData: ChartConfiguration<'bar'>['data'] = {
    labels: this.chartLabels,
    datasets: [{
      label: 'Países Emissores',
      data: [
        2500,
        2400,
        2300,
        2200,
        2100,
        2000,
        1900,
        1700,
        1500,
        1000
      ],
      backgroundColor: this.chartLabels.map(pais =>
        this.coresContinentes[this.continentesPaises[pais]] ?? '#94a3b8'
      ),
      borderRadius: 4
    }]
  };

  chartType: ChartConfiguration<'bar'>['type'] = 'bar';
}

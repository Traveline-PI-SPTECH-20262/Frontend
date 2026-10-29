import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  ChangeDetectionStrategy
} from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';

interface Pais {
  nome: string;
  regiao: string;
  chegadas: {
    '2019': number;
    '2020': number;
    '2021': number;
  };
}

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './bar-chart.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarChart implements OnChanges {
  @Input() paisFiltro = '';
  @Input() anoFiltro = 'todos';
  @Input() regiaoFiltro = 'todas';
  @Input() metricaFiltro = 'chegadas';
  @Input() subRegioesFiltro: string[] = [];

  private todosPaises: Pais[] = [
    {
      nome: 'Argentina',
      regiao: 'América do Sul',
      chegadas: { '2019': 3100, '2020': 1200, '2021': 2500 }
    },
    {
      nome: 'Estados Unidos',
      regiao: 'América do Norte',
      chegadas: { '2019': 2200, '2020': 800, '2021': 1800 }
    },
    {
      nome: 'Chile',
      regiao: 'América do Sul',
      chegadas: { '2019': 1700, '2020': 650, '2021': 1500 }
    },
    {
      nome: 'Paraguai',
      regiao: 'América do Sul',
      chegadas: { '2019': 2800, '2020': 1100, '2021': 2500 }
    },
    {
      nome: 'Uruguai',
      regiao: 'América do Sul',
      chegadas: { '2019': 2000, '2020': 700, '2021': 1800 }
    },
    {
      nome: 'França',
      regiao: 'Europa',
      chegadas: { '2019': 1600, '2020': 550, '2021': 1500 }
    },
    {
      nome: 'Alemanha',
      regiao: 'Europa',
      chegadas: { '2019': 1400, '2020': 480, '2021': 2500 }
    },
    {
      nome: 'Portugal',
      regiao: 'Europa',
      chegadas: { '2019': 1900, '2020': 620, '2021': 1800 }
    },
    {
      nome: 'Reino Unido',
      regiao: 'Europa',
      chegadas: { '2019': 1100, '2020': 380, '2021': 2500 }
    },
    {
      nome: 'Itália',
      regiao: 'Europa',
      chegadas: { '2019': 950, '2020': 320, '2021': 1000 }
    }
  ];

  chartType: 'bar' = 'bar';

  chartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Chegadas de turistas',
        data: [],
        backgroundColor: '#5B2A86'
      }
    ]
  };

  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        beginAtZero: true
      }
    }
  };

  ngOnChanges(): void {
    let paises = [...this.todosPaises];

    // Filtrar pelo nome do país
    if (this.paisFiltro.trim() !== '') {
      paises = paises.filter(p =>
        p.nome.toLowerCase().includes(this.paisFiltro.toLowerCase())
      );
    }

    // Filtrar pela região
    if (this.regiaoFiltro !== 'todas') {
      paises = paises.filter(p => {
        if (this.regiaoFiltro === 'América') {
          return p.regiao.startsWith('América');
        }

        return p.regiao === this.regiaoFiltro;
      });
    }

    // Filtrar pelas sub-regiões selecionadas
    if (this.subRegioesFiltro.length > 0) {
      paises = paises.filter(p =>
        this.subRegioesFiltro.includes(p.regiao) ||
        this.subRegioesFiltro.includes(p.nome)
      );
    }

    // Selecionar o ano ou somar os anos
    const paisesFiltrados = paises.map(p => {
      let chegadas: number;

      if (this.anoFiltro === 'todos') {
        chegadas =
          p.chegadas['2019'] +
          p.chegadas['2020'] +
          p.chegadas['2021'];
      } else {
        chegadas =
          p.chegadas[this.anoFiltro as '2019' | '2020' | '2021'];
      }

      // Manter o cálculo de receita usado anteriormente
      const valor = this.metricaFiltro === 'receita'
        ? chegadas * 150
        : chegadas;

      return {
        nome: p.nome,
        valor
      };
    });

    // Atualizar os dados do gráfico
    this.chartData = {
      labels: paisesFiltrados.map(p => p.nome),
      datasets: [
        {
          label: this.metricaFiltro === 'receita'
            ? 'Receita estimada'
            : 'Chegadas de turistas',
          data: paisesFiltrados.map(p => p.valor),
          backgroundColor: '#5B2A86'
        }
      ]
    };
  }
}
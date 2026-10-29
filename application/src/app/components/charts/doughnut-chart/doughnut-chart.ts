import { Component, Input, OnChanges } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

interface Continente {
  nome: string;
  chegadas: {
    '2019': number;
    '2020': number;
    '2021': number;
  };
}

@Component({
  selector: 'app-doughnut-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './doughnut-chart.html',
  styleUrl: './doughnut-chart.css',
})
export class DoughnutChart implements OnChanges {
  @Input() anoFiltro = 'todos';
  @Input() regiaoFiltro = 'todas';
  @Input() metricaFiltro = 'chegadas';
  @Input() subRegioesFiltro: string[] = [];

  private dadosOriginais: Continente[] = [
    {
      nome: 'África',
      chegadas: { '2019': 2800, '2020': 1500, '2021': 2500 }
    },
    {
      nome: 'América do Norte',
      chegadas: { '2019': 2200, '2020': 1000, '2021': 1800 }
    },
    {
      nome: 'América do Sul',
      chegadas: { '2019': 2000, '2020': 900, '2021': 1500 }
    },
    {
      nome: 'Ásia',
      chegadas: { '2019': 3000, '2020': 1600, '2021': 2500 }
    },
    {
      nome: 'Europa',
      chegadas: { '2019': 2400, '2020': 1200, '2021': 1800 }
    },
    {
      nome: 'Oceania',
      chegadas: { '2019': 1300, '2020': 600, '2021': 1000 }
    }
  ];

  chartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right' }
    }
  };

  chartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: [],
    datasets: [{
      label: 'Chegadas',
      data: [],
      backgroundColor: [
        '#8c62f7', '#caf762', '#12c335',
        '#de1717', '#d61ebb', '#36a6ce'
      ],
      borderRadius: 4
    }]
  };

  chartType: ChartConfiguration<'doughnut'>['type'] = 'doughnut';

  ngOnChanges(): void {
    let dados = [...this.dadosOriginais];

    // Filtrar pela região selecionada
    if (this.regiaoFiltro !== 'todas') {
      dados = dados.filter(item => {
        if (this.regiaoFiltro === 'América') {
          return item.nome.startsWith('América');
        }

        return item.nome === this.regiaoFiltro;
      });
    }

    // Filtrar pelas sub-regiões selecionadas
    if (this.subRegioesFiltro.length > 0) {
      dados = dados.filter(item =>
        this.subRegioesFiltro.includes(item.nome) ||
        (
          item.nome === 'Europa' &&
          this.subRegioesFiltro.includes('Reino Unido')
        )
      );
    }

    // Selecionar o ano ou somar os três anos
    const dadosFiltrados = dados.map(item => {
      let chegadas: number;

      if (this.anoFiltro === 'todos') {
        chegadas =
          item.chegadas['2019'] +
          item.chegadas['2020'] +
          item.chegadas['2021'];
      } else {
        chegadas =
          item.chegadas[this.anoFiltro as '2019' | '2020' | '2021'];
      }

      // Calcular a receita estimada
      const valor = this.metricaFiltro === 'receita'
        ? chegadas * 150
        : chegadas;

      return {
        nome: item.nome,
        valor: Math.round(valor)
      };
    });

    // Atualizar o gráfico
    this.chartData = {
      labels: dadosFiltrados.map(item => item.nome),
      datasets: [{
        label: this.metricaFiltro === 'receita'
          ? 'Receita estimada'
          : 'Chegadas',
        data: dadosFiltrados.map(item => item.valor),
        backgroundColor: [
          '#8c62f7', '#caf762', '#12c335',
          '#de1717', '#d61ebb', '#36a6ce'
        ],
        borderRadius: 4
      }]
    };
  }
}
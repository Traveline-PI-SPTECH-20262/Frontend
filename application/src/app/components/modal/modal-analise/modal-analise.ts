import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

export type TipoAnalise = 'paises' | 'continentes' | 'ufs' | 'sazonalidade';

type Registro = { ano: number; pais: string; continente: string; uf: string; mes: number; chegadas: number };
type Linha = { nome: string; valor: number; participacao: number };

@Component({
  selector: 'app-modal-analise',
  standalone: true,
  imports: [FormsModule, DecimalPipe, BaseChartDirective],
  templateUrl: './modal-analise.html',
  styleUrl: './modal-analise.css'
})
export class ModalAnalise implements OnChanges {
  @Input() aberto = false;
  @Input() tipo: TipoAnalise = 'paises';
  @Output() fechar = new EventEmitter<void>();

  ano = 'todos';
  continente = 'todos';
  uf = 'todas';
  busca = '';
  visualizacao: 'top10' | 'todos' = 'top10';
  ordenacao: 'maior' | 'menor' | 'alfabetica' = 'maior';

  readonly meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  readonly cores: Record<string, string> = {
    'América': '#1c9b5f', 'Europa': '#de1717', 'África': '#8c62f7',
    'Ásia': '#f59e0b', 'Oceania': '#ec4899'
  };
  readonly roxo = '#895cf5';
  readonly ufs = ['SP', 'RJ', 'PR', 'BA', 'RS', 'SC', 'MG', 'PE', 'CE', 'DF'];
  readonly anos = [2021, 2020, 2019];
  readonly continentes = ['América', 'Europa', 'África', 'Ásia', 'Oceania'];

  // Mock interno: substitua esta propriedade pela resposta do backend futuramente.
  readonly dados: Registro[] = this.criarDadosMock();

  linhas: Linha[] = [];
  total = 0;
  semDados = false;
  chartType: ChartType = 'bar';
  chartData: ChartConfiguration['data'] = { labels: [], datasets: [] };
  chartOptions: ChartConfiguration['options'] = {};

  get titulo(): string {
    return {
      paises: 'Países emissores', continentes: 'Participação por continente',
      ufs: 'Chegadas por UF de entrada', sazonalidade: 'Sazonalidade das chegadas'
    }[this.tipo];
  }

  get descricao(): string {
    return {
      paises: 'Explore os mercados emissores e compare a participação de cada país.',
      continentes: 'Entenda a distribuição das chegadas por continente.',
      ufs: 'Identifique os principais estados de entrada dos turistas.',
      sazonalidade: 'Descubra os períodos de maior e menor movimento.'
    }[this.tipo];
  }

  get maiorMes(): Linha | undefined {
    return this.tipo === 'sazonalidade' ? [...this.linhas].sort((a, b) => b.valor - a.valor)[0] : undefined;
  }

  get menorMes(): Linha | undefined {
    return this.tipo === 'sazonalidade' ? [...this.linhas].sort((a, b) => a.valor - b.valor)[0] : undefined;
  }

  get linhasVisiveis(): Linha[] {
    return this.tipo === 'paises' && this.visualizacao === 'top10'
      ? this.linhas.slice(0, 10) : this.linhas;
  }

  ngOnChanges(): void {
    this.limpar();
  }

  limpar(): void {
    this.ano = 'todos';
    this.continente = 'todos';
    this.uf = 'todas';
    this.busca = '';
    this.ordenacao = 'maior';
    this.visualizacao = 'top10';
    this.atualizar();
  }

  atualizar(): void {
    const filtrados = this.dados.filter(d =>
      (this.ano === 'todos' || d.ano === Number(this.ano)) &&
      (this.continente === 'todos' || d.continente === this.continente) &&
      (this.uf === 'todas' || d.uf === this.uf) &&
      (this.tipo !== 'paises' || d.pais.toLocaleLowerCase('pt-BR').includes(this.busca.trim().toLocaleLowerCase('pt-BR')))
    );

    const campo: keyof Registro = this.tipo === 'paises' ? 'pais'
      : this.tipo === 'continentes' ? 'continente'
      : this.tipo === 'ufs' ? 'uf' : 'mes';

    const grupos = new Map<string, number>();
    for (const d of filtrados) {
      const nome = String(d[campo]);
      grupos.set(nome, (grupos.get(nome) || 0) + d.chegadas);
    }

    this.total = [...grupos.values()].reduce((soma, valor) => soma + valor, 0);
    this.linhas = [...grupos].map(([nome, valor]) => ({
      nome: campo === 'mes' ? this.meses[Number(nome) - 1] : nome,
      valor,
      participacao: this.total ? valor / this.total * 100 : 0
    }));

    if (this.tipo === 'sazonalidade') {
      this.linhas.sort((a, b) => this.meses.indexOf(a.nome) - this.meses.indexOf(b.nome));
    } else if (this.ordenacao === 'alfabetica') {
      this.linhas.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
    } else {
      this.linhas.sort((a, b) => this.ordenacao === 'maior' ? b.valor - a.valor : a.valor - b.valor);
    }

    this.semDados = this.linhas.length === 0;
    const exibidas = this.linhasVisiveis;
    const cores = exibidas.map(l => {
      if (this.tipo === 'continentes') return this.cores[l.nome] || this.roxo;
      if (this.tipo === 'paises') {
        const pais = filtrados.find(d => d.pais === l.nome);
        return this.cores[pais?.continente || ''] || this.roxo;
      }
      return this.roxo;
    });

    this.chartType = this.tipo === 'continentes' ? 'doughnut'
      : this.tipo === 'sazonalidade' ? 'line' : 'bar';

    this.chartData = {
      labels: exibidas.map(l => l.nome),
      datasets: [{
        label: 'Chegadas de turistas',
        data: exibidas.map(l => l.valor),
        backgroundColor: this.tipo === 'sazonalidade' ? 'rgba(137,92,245,.12)' : cores,
        borderColor: this.tipo === 'sazonalidade' ? this.roxo : cores,
        borderWidth: this.tipo === 'sazonalidade' ? 3 : 0,
        pointBackgroundColor: this.roxo,
        pointRadius: this.tipo === 'sazonalidade' ? 4 : 0,
        tension: 0.35,
        fill: this.tipo === 'sazonalidade',
        borderRadius: 5
      }]
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: this.tipo === 'paises' ? 'y' : 'x',
      plugins: { legend: { display: false } },
      ...(this.tipo === 'continentes' ? { cutout: '70%' } : {
        scales: {
          x: { grid: { display: false }, ticks: { autoSkip: this.tipo !== 'paises' } },
          y: { grid: { display: this.tipo !== 'paises' }, ticks: { autoSkip: false } }
        }
      })
    };
  }

  exportarCsv(): void {
    const linhas = [
      ['Item', 'Chegadas', 'Participação (%)'],
      ...this.linhasVisiveis.map(l => [l.nome, String(l.valor), l.participacao.toFixed(2)])
    ];
    const csv = '\uFEFF' + linhas.map(l => l.map(c => `"${c.replace(/"/g, '""')}"`).join(';')).join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `traveline-${this.tipo}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  private criarDadosMock(): Registro[] {
    const paises = [
      ['Argentina', 'América'], ['França', 'Europa'], ['Japão', 'Ásia'],
      ['Estados Unidos', 'América'], ['África do Sul', 'África'], ['Alemanha', 'Europa'],
      ['China', 'Ásia'], ['Chile', 'América'], ['Austrália', 'Oceania'],
      ['Portugal', 'Europa'], ['Uruguai', 'América'], ['Itália', 'Europa'],
      ['Paraguai', 'América'], ['Espanha', 'Europa'], ['Canadá', 'América'],
      ['México', 'América'], ['Reino Unido', 'Europa'], ['Coreia do Sul', 'Ásia'],
      ['Colômbia', 'América'], ['Peru', 'América'], ['Bolívia', 'América'],
      ['Suíça', 'Europa'], ['Índia', 'Ásia'], ['Angola', 'África'],
      ['Nova Zelândia', 'Oceania'], ['Bélgica', 'Europa'], ['Equador', 'América'],
      ['Marrocos', 'África'], ['Israel', 'Ásia'], ['Países Baixos', 'Europa']
    ];
    const dados: Registro[] = [];
    for (let ano = 2019; ano <= 2021; ano++) {
      for (let i = 0; i < paises.length; i++) {
        for (let mes = 1; mes <= 12; mes++) {
          dados.push({
            ano,
            pais: paises[i][0],
            continente: paises[i][1],
            uf: this.ufs[(i + mes + ano) % this.ufs.length],
            mes,
            chegadas: Math.round((2600 - i * 55) * (ano === 2020 ? .65 : ano === 2021 ? .82 : 1) *
              (0.75 + ((mes * 7 + i) % 9) / 18))
          });
        }
      }
    }
    return dados;
  }
}

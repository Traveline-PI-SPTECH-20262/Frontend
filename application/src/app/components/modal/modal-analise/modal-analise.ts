import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../../../services/userservices/auth.service';
import API_URL from '../../../config';


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
  const usuario = this.authService.getToken();
  const idAgencia = usuario?.idAgencia;

  if (!idAgencia || idAgencia < 1) {
    console.error('Não foi possível identificar a agência logada.');
    this.linhas = [];
    this.total = 0;
    this.semDados = true;
    return;
  }

  let params = new HttpParams();

  if (this.ano !== 'todos') {
    params = params.set('ano', this.ano);
  }

  if (this.continente !== 'todos') {
    params = params.set('continente', this.continente);
  }

  if (this.uf !== 'todas') {
    params = params.set('uf', this.uf);
  }

  if (this.busca.trim()) {
    params = params.set('busca', this.busca.trim());
  }

  this.http.get<{ total: number; linhas: Linha[] }>(
    `${API_URL}:3000/dashboard/analise/${this.tipo}/${idAgencia}`,
    { params }
  ).subscribe({
    next: (resposta) => {
      this.total = Number(resposta.total);

      this.linhas = resposta.linhas.map(linha => ({
        ...linha,
        nome: this.tipo === 'sazonalidade'
          ? this.meses[Number(linha.nome) - 1] || linha.nome
          : linha.nome,
        valor: Number(linha.valor),
        participacao: Number(linha.participacao)
      }));

      if (this.tipo === 'sazonalidade') {
        this.linhas.sort(
          (a, b) => this.meses.indexOf(a.nome) - this.meses.indexOf(b.nome)
        );
      } else if (this.ordenacao === 'alfabetica') {
        this.linhas.sort(
          (a, b) => a.nome.localeCompare(b.nome, 'pt-BR')
        );
      } else {
        this.linhas.sort(
          (a, b) => this.ordenacao === 'maior'
            ? b.valor - a.valor
            : a.valor - b.valor
        );
      }

      this.semDados = this.linhas.length === 0;

      this.atualizarGrafico();
    },
    error: (erro) => {
      console.error('Erro ao buscar dados da análise:', erro);
      this.linhas = [];
      this.total = 0;
      this.semDados = true;
    }
  });
}


private atualizarGrafico(): void {
  const exibidas = this.linhasVisiveis;

  const cores = exibidas.map(linha =>
    this.tipo === 'continentes'
      ? this.cores[linha.nome] || this.roxo
      : this.roxo
  );

  this.chartType = this.tipo === 'continentes'
    ? 'doughnut'
    : this.tipo === 'sazonalidade'
      ? 'line'
      : 'bar';

  this.chartData = {
    labels: exibidas.map(linha => linha.nome),
    datasets: [{
      label: 'Chegadas de turistas',
      data: exibidas.map(linha => linha.valor),
      backgroundColor: this.tipo === 'sazonalidade'
        ? 'rgba(137,92,245,.12)'
        : cores,
      borderColor: this.tipo === 'sazonalidade'
        ? this.roxo
        : cores,
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
    plugins: {
      legend: { display: false }
    },
    ...(this.tipo === 'continentes'
      ? { cutout: '70%' }
      : {
          scales: {
            x: {
              grid: { display: false },
              ticks: { autoSkip: this.tipo !== 'paises' }
            },
            y: {
              grid: { display: this.tipo !== 'paises' },
              ticks: { autoSkip: false }
            }
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

 
  constructor(
  private http: HttpClient,
  private authService: AuthService
) {}
}

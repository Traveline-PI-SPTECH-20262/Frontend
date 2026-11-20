import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/userservices/auth.service';
import { AnaliseService, RegistroAnalise } from '../../../services/analiseservice/analise.service';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, ChangeDetectorRef } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

export type TipoAnalise = 'paises' | 'continentes' | 'ufs' | 'sazonalidade';

type Linha = { nome: string; valor: number; participacao: number };

@Component({
  selector: 'app-modal-analise',
  standalone: true,
  imports: [FormsModule, DecimalPipe, BaseChartDirective],
  templateUrl: './modal-analise.html',
  styleUrl: './modal-analise.css'
})
export class ModalAnalise implements OnChanges, OnDestroy {
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
    'América': '#1c9b5f', 'América do Sul': '#16a34a', 'América do Norte': '#2563eb',
    'América Central e Caribe': '#14b8a6', 'Europa': '#de1717', 'África': '#8c62f7',
    'Ásia': '#f59e0b', 'Oceania': '#ec4899'
  };
  readonly roxo = '#895cf5';
  ufs: string[] = [];
  anos: number[] = [];
  continentes: string[] = [];

  dadosPaises: RegistroAnalise[] = [];
  dadosUfs: RegistroAnalise[] = [];
  carregando = false;
  erro = '';
  private consulta?: Subscription;

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

  constructor(
    private analiseService: AnaliseService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(): void {
    this.consulta?.unsubscribe();
    if (!this.aberto) return;

    this.dadosPaises = [];
    this.dadosUfs = [];
    this.anos = [];
    this.ufs = [];
    this.continentes = [];
    this.erro = '';
    this.limpar();

    const usuario = this.authService.getToken();
    if (!usuario?.idAgencia) return;

    this.carregando = true;
    this.consulta = this.analiseService.getAnalise(usuario.idAgencia).subscribe({
      next: (dados) => {
        this.dadosPaises = dados.paises;
        this.dadosUfs = dados.ufs;
        this.carregarFiltros();
        this.carregando = false;
        this.atualizar();
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar análise:', erro);
        this.erro = 'Não foi possível carregar a análise.';
        this.carregando = false;
        this.atualizar();
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy(): void {
    this.consulta?.unsubscribe();
  }

  carregarFiltros(): void {
    let dados = this.dadosPaises;
    if (this.tipo === 'ufs' || this.tipo === 'sazonalidade') dados = this.dadosUfs;

    for (const linha of dados) {
      if (!this.anos.includes(linha.ano)) this.anos.push(linha.ano);
    }
    for (const linha of this.dadosPaises) {
      const continente = linha.continente || 'Não informado';
      if (!this.continentes.includes(continente)) this.continentes.push(continente);
    }
    for (const linha of this.dadosUfs) {
      if (linha.uf && !this.ufs.includes(linha.uf)) this.ufs.push(linha.uf);
    }
    this.anos.sort(function (a, b) { return b - a; });
    this.continentes.sort();
    this.ufs.sort();
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
    let dados = this.dadosPaises;
    if (this.tipo === 'ufs' || this.tipo === 'sazonalidade') dados = this.dadosUfs;

    const filtrados: RegistroAnalise[] = [];
    for (const linha of dados) {
      if (this.ano !== 'todos' && linha.ano !== Number(this.ano)) continue;
      if ((this.tipo === 'paises' || this.tipo === 'continentes') &&
          this.continente !== 'todos' && (linha.continente || 'Não informado') !== this.continente) continue;
      if ((this.tipo === 'ufs' || this.tipo === 'sazonalidade') &&
          this.uf !== 'todas' && linha.uf !== this.uf) continue;
      if (this.tipo === 'paises' &&
          !String(linha.pais).toLocaleLowerCase('pt-BR').includes(this.busca.trim().toLocaleLowerCase('pt-BR'))) continue;
      filtrados.push(linha);
    }

    this.total = 0;
    this.linhas = [];
    for (const linha of filtrados) {
      let nome = linha.pais || 'Não informado';
      if (this.tipo === 'continentes') nome = linha.continente || 'Não informado';
      if (this.tipo === 'ufs') nome = linha.uf || 'Não informado';
      if (this.tipo === 'sazonalidade') nome = this.meses[linha.mes - 1];

      let grupo = this.linhas.find(function (item) { return item.nome === nome; });
      if (!grupo) {
        grupo = { nome: nome, valor: 0, participacao: 0 };
        this.linhas.push(grupo);
      }
      grupo.valor += linha.chegadas;
      this.total += linha.chegadas;
    }

    for (const linha of this.linhas) {
      if (this.total > 0) linha.participacao = linha.valor / this.total * 100;
    }

    if (this.tipo === 'sazonalidade') {
      // Mantém janeiro a dezembro, inclusive meses sem movimento.
      if (filtrados.length > 0) {
        for (const mes of this.meses) {
          if (!this.linhas.some(function (linha) { return linha.nome === mes; })) {
            this.linhas.push({ nome: mes, valor: 0, participacao: 0 });
          }
        }
      }
      this.linhas.sort((a, b) => this.meses.indexOf(a.nome) - this.meses.indexOf(b.nome));
    } else if (this.ordenacao === 'alfabetica') {
      this.linhas.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
    } else {
      this.linhas.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
      if (this.ordenacao === 'maior') this.linhas.sort((a, b) => b.valor - a.valor);
      if (this.ordenacao === 'menor') this.linhas.sort((a, b) => a.valor - b.valor);
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
      color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim(),
      plugins: { legend: { display: false } },
      ...(this.tipo === 'continentes' ? { cutout: '70%' } : {
        scales: {
          x: { grid: { display: false }, ticks: { autoSkip: this.tipo !== 'paises' } },
          y: { grid: { display: this.tipo !== 'paises', color: getComputedStyle(document.documentElement).getPropertyValue('--graph-line').trim() }, ticks: { autoSkip: false } }
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

}

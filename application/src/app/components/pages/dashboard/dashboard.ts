import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ChartConfiguration } from 'chart.js';
import { LineChart } from '../../charts/line-chart/line-chart';
import { BarChart } from '../../charts/bar-chart/bar-chart';
import { DoughnutChart } from '../../charts/doughnut-chart/doughnut-chart';
import { BarStandingChart } from '../../charts/bar-standing-chart/bar-standing-chart';
import { KpiCard } from '../../kpi-card/kpi-card';
import { Header } from '../../header/header';
import { ConfiguracoesService } from '../../../services/services/configuracoes';
import { AuthService } from '../../../services/userservices/auth.service';
import { DashboardService, DashboardDados, LinhaGrafico } from '../../../services/dashboardservice/dashboard.service';
import { ModalAnalise, TipoAnalise } from '../../modal/modal-analise/modal-analise';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [LineChart, KpiCard, Header, BarChart, DoughnutChart, BarStandingChart, ModalAnalise, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  dados: DashboardDados | null = null;
  carregando = false;
  erro = '';
  analiseAberta = false;
  tipoAnalise: TipoAnalise = 'paises';
  // Filtros da dashboard
  anoSelecionado: number | '' = '';
  continenteSelecionado = '';
  anosDisponiveis: number[] = [];
  continentesDisponiveis: string[] = [];
  continentes: ChartConfiguration<'doughnut'>['data'] = { labels: [], datasets: [] };
  paises: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  ufs: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  sazonalidade: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  cores: Record<string, string> = {
    'América': '#1c9b5f',
    'América do Sul': '#16a34a',
    'América do Norte': '#2563eb',
    'América Central e Caribe': '#14b8a6',
    'Europa': '#ef4444',
    'Ásia': '#f59e0b',
    'Oceania': '#ec4899',
    'África': '#8b5cf6'
  };

  constructor(
    public configuracoes: ConfiguracoesService,
    private authService: AuthService,
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() { this.carregar(); }

  carregar() {
    if (this.carregando) return;
    const usuario = this.authService.getToken();
    if (!usuario?.idAgencia) {
      this.erro = 'Faça login para consultar os dados da sua agência.';
      return;
    }
    this.carregando = true;
    this.erro = '';
    this.dashboardService.getGeral(usuario.idAgencia, {
  ano: this.anoSelecionado,
  continente: this.continenteSelecionado
}).subscribe({
  next: (dados) => {

    if (dados.filtros) {
      this.anosDisponiveis = dados.filtros.anosDisponiveis;
      this.continentesDisponiveis = dados.filtros.continentesDisponiveis;
    }

    this.dados = dados;

    if (dados.semDados) this.dados = this.dadosVazios();

    this.montarGraficos(this.dados);
    this.carregando = false;
    this.cdr.detectChanges();
  },
      error: (erro) => {
        this.erro = erro.error?.mensagem || 'Não foi possível carregar a dashboard.';
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }

    limparFiltros() {
    this.anoSelecionado = '';
    this.continenteSelecionado = '';
    this.carregar();
  }
  
  dadosVazios(): DashboardDados {
    return {
      planilha: null, semDados: true, periodo: '', ano: 0, anoAnterior: 0,
      kpis: [
        { chave: 'totalTuristas', titulo: 'Total de turistas', valor: 0, variacao: null, icone: '👤' },
        { chave: 'viaAerea', titulo: 'Via aérea', valor: 0, variacao: null, icone: '🛬' },
        { chave: 'viaTerrestre', titulo: 'Via terrestre', valor: 0, variacao: null, icone: '🚗' },
        { chave: 'viaMaritima', titulo: 'Via marítima', valor: 0, variacao: null, icone: '🛥️' },
        { chave: 'viaFluvial', titulo: 'Via fluvial', valor: 0, variacao: null, icone: '🌊' },
        { chave: 'paisesEmissores', titulo: 'Países emissores', valor: 0, variacao: null, icone: '🌎' }
      ],
      continentes: [], paises: [], ufs: [], sazonalidade: [], oportunidades: []
    };
  }

  nomes(linhas: LinhaGrafico[]) {
    const nomes: string[] = [];
    for (const linha of linhas) nomes.push(linha.nome);
    return nomes;
  }

  valores(linhas: LinhaGrafico[]) {
    const valores: number[] = [];
    for (const linha of linhas) valores.push(linha.valor);
    return valores;
  }

  montarGraficos(dados: DashboardDados) {
    const coresContinentes: string[] = [];
    for (const continente of dados.continentes) {
      coresContinentes.push(this.cores[continente.nome] || '#94a3b8');
    }

    const coresPaises: string[] = [];
    for (const pais of dados.paises) {
      coresPaises.push(this.cores[pais.continente || ''] || '#94a3b8');
    }

    this.continentes = {
      labels: this.nomes(dados.continentes),
      datasets: [{
        label: 'Chegadas',
        data: this.valores(dados.continentes),
        backgroundColor: coresContinentes,
        borderRadius: 4
      }]
    };

    this.paises = {
      labels: this.nomes(dados.paises),
      datasets: [{
        label: 'Chegadas',
        data: this.valores(dados.paises),
        backgroundColor: coresPaises,
        borderRadius: 4
      }]
    };

    this.ufs = {
      labels: this.nomes(dados.ufs),
      datasets: [{
        label: 'Chegadas',
        data: this.valores(dados.ufs),
        backgroundColor: '#8c62f7',
        borderRadius: 4
      }]
    };

    this.sazonalidade = {
      labels: this.nomes(dados.sazonalidade),
      datasets: [{
        label: 'Chegadas de turistas por mês',
        data: this.valores(dados.sazonalidade),
        backgroundColor: '#351486',
        borderColor: '#8c62f7'
      }]
    };
  }

  numero(valor: number) {
    return valor.toLocaleString('pt-BR');
  }

  percentual(valor: number | null) {
    if (valor === null) return 'Sem comparação';

    let sinal = '';
    if (valor > 0) sinal = '+';

    return sinal + valor.toLocaleString('pt-BR', { maximumFractionDigits: 2 }) + '%';
  }

  detalheKpi(variacao: number | null) {
    if (this.dados?.semDados) return '—';
    if (variacao === null) return 'Sem base para comparação';

    let seta = '';
    if (variacao > 0) seta = '↑ ';
    if (variacao < 0) seta = '↓ ';

    return seta + this.percentual(variacao) + ' vs. ' + this.dados?.anoAnterior;
  }

  abrirAnalise(tipo: TipoAnalise) {
    this.tipoAnalise = tipo;
    this.analiseAberta = true;
  }

  fecharAnalise() {
    this.analiseAberta = false;
  }

  irRecomendacao() {
    this.router.navigate(['/main/recomendacoes']);
  }
}

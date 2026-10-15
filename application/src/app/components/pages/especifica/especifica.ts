import { Component, OnInit, computed, signal } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { Header } from '../../header/header';
import { KpiCard } from '../../kpi-card/kpi-card';
import { StackedBarChart } from '../../charts/stacked-bar-chart/stacked-bar-chart';
import { EspecificaDados, EspecificaService } from '../../../services/especificaservice/especifica.service';

const CORES = ['#8c62f7', '#f0588c', '#14b8a6'];

@Component({
  selector: 'app-especifica',
  imports: [Header, KpiCard, StackedBarChart],
  templateUrl: './especifica.html',
  styleUrl: './especifica.css',
})
export class Especifica implements OnInit {
  dados = signal<EspecificaDados | null>(null);
  erro = signal('');

  receitaChart = computed<ChartConfiguration<'bar'>['data']>(() => {
    const d = this.dados();
    if (!d) {
      return { labels: [], datasets: [] };
    }
    return {
      labels: d.trimestres.labels,
      datasets: d.trimestres.modais.map((modal, i) => ({
        label: modal.nome,
        data: modal.valores,
        backgroundColor: CORES[i % CORES.length],
      })),
    };
  });

  constructor(private especificaService: EspecificaService) {}

  ngOnInit() {
    this.especificaService.getEspecifica().subscribe({
      next: (dados) => this.dados.set(dados),
      error: () => this.erro.set('Não foi possível carregar os dados. O back-end está rodando?'),
    });
  }
}
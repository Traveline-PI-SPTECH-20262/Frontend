
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Chart } from 'chart.js';

export type Tema = 'claro' | 'escuro' | 'automatico';


export interface KpiVisibilidade {
  totalTuristas: boolean;
  viaAerea: boolean;
  viaTerrestre: boolean;
  viaMaritima: boolean;
  viaFluvial: boolean;
  paisesEmissores: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ConfiguracoesService {

  tema: Tema = 'claro';


  kpis: KpiVisibilidade = {
    totalTuristas: true,
    viaAerea: true,
    viaTerrestre: true,
    viaMaritima: true,
    viaFluvial: true,
    paisesEmissores: true
  };

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.carregarConfiguracoes();
  }

  salvarPreferencias(
    tema: Tema,
    kpis: KpiVisibilidade
  ) {
    this.tema = tema;
    this.kpis = { ...kpis };

    this.aplicarTema();
    this.atualizarGraficos();

    localStorage.setItem('traveline-config', JSON.stringify({
      tema: this.tema,
      kpis: this.kpis
    }));
  }

  private aplicarTema() {
    this.document.documentElement.setAttribute('data-theme', this.tema);
  }

 
  private carregarConfiguracoes() {
    const dados = localStorage.getItem('traveline-config');

    if (dados) {
      try {
        const config = JSON.parse(dados);

        if (['claro', 'escuro', 'automatico'].includes(config.tema)) {
          this.tema = config.tema;
        }

        if (config.kpis) {
          this.kpis = {
            ...this.kpis,
            ...config.kpis
          };
        }
      } catch {
        console.warn('Não foi possível carregar as configurações.');
      }
    }

    this.aplicarTema();
  }

  
private atualizarGraficos() {
  const corTexto = getComputedStyle(this.document.documentElement)
    .getPropertyValue('--text-primary')
    .trim();
  const corGrade = getComputedStyle(this.document.documentElement)
    .getPropertyValue('--graph-line')
    .trim();

  Object.values(Chart.instances).forEach((instancia) => {
    const chart = instancia as Chart;

    // Atualiza a cor geral dos textos do gráfico
    chart.options.color = corTexto;

    // Atualiza os eixos X e Y
    Object.values(chart.options.scales ?? {}).forEach((escala: any) => {

      escala.ticks.color = corTexto;

      escala.grid.color = corGrade;

      if (escala.title) {
        escala.title.color = corTexto;
      }

    });
    chart.update();
  });
}

}

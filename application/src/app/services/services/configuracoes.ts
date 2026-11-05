
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Chart } from 'chart.js';

export type Tema = 'claro' | 'escuro' | 'automatico';

export type TamanhoFonte = 'pequena' | 'media' | 'grande';

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

  tamanhoFonte: TamanhoFonte = 'media';

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
    tamanhoFonte: TamanhoFonte,
    kpis: KpiVisibilidade
  ) {
    this.tema = tema;
    this.tamanhoFonte = tamanhoFonte;
    this.kpis = { ...kpis };

    this.aplicarTema();
    this.aplicarFonte();
    this.atualizarGraficos();

    localStorage.setItem('traveline-config', JSON.stringify({
      tema: this.tema,
      tamanhoFonte: this.tamanhoFonte,
      kpis: this.kpis
    }));
  }

  private aplicarTema() {
    this.document.documentElement.setAttribute('data-theme', this.tema);
  }

 

  private aplicarFonte() {
    const tamanhos = {
      pequena: '14px',
      media: '16px',
      grande: '18px'
    };

    this.document.documentElement.style.fontSize =
      tamanhos[this.tamanhoFonte];
  }

  private carregarConfiguracoes() {
    const dados = localStorage.getItem('traveline-config');

    if (dados) {
      try {
        const config = JSON.parse(dados);

        if (['claro', 'escuro', 'automatico'].includes(config.tema)) {
          this.tema = config.tema;
        }

        if (['pequena', 'media', 'grande'].includes(config.tamanhoFonte)) {
          this.tamanhoFonte = config.tamanhoFonte;
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
    this.aplicarFonte();
  }

  
private atualizarGraficos() {
  const corTexto = getComputedStyle(this.document.documentElement)
    .getPropertyValue('--text-primary')
    .trim();

  Object.values(Chart.instances).forEach((instancia) => {
    const chart = instancia as Chart;

    // Atualiza a cor geral dos textos do gráfico
    chart.options.color = corTexto;

    // Atualiza os eixos X e Y
    Object.values(chart.options.scales ?? {}).forEach((escala: any) => {

      escala.ticks.color = corTexto;

      escala.grid.color = corTexto;

      if (escala.title) {
        escala.title.color = corTexto;
      }

    });
    chart.update();
  });
}

}

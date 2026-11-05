import { Component } from '@angular/core';
import { LineChart } from '../../charts/line-chart/line-chart';
import {BarChart} from '../../charts/bar-chart/bar-chart';
import {DoughnutChart} from '../../charts/doughnut-chart/doughnut-chart';
import {BarStandingChart} from '../../charts/bar-standing-chart/bar-standing-chart';
import { KpiCard } from '../../kpi-card/kpi-card';
import { Header } from '../../header/header';
import { ConfiguracoesService } from '../../../services/services/configuracoes';
import { ModalAnalise, TipoAnalise } from '../../modal/modal-analise/modal-analise';

@Component({
  selector: 'app-dashboard',
  imports: [LineChart,KpiCard,Header,BarChart,DoughnutChart,BarStandingChart, ModalAnalise],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  constructor(
  public configuracoes: ConfiguracoesService
) {}
analiseAberta = false;
tipoAnalise: TipoAnalise = 'paises';

abrirAnalise(tipo: TipoAnalise) {
  this.tipoAnalise = tipo;
  this.analiseAberta = true;
}

irRecomendacao(){
  window.location.href = '/recomendacoes'
}

fecharAnalise() {
  this.analiseAberta = false;
}
}
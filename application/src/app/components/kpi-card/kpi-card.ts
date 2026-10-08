import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-kpi-card',
  imports: [],
  templateUrl: './kpi-card.html',
  styleUrl: './kpi-card.css'
})
export class KpiCard {
  @Input() titulo = '';
  @Input() valor = '';
  @Input() variacao = '';
  @Input() icone = '';
}

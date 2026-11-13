import { Component } from '@angular/core';

@Component({
  selector: 'app-historico-upload',
  imports: [],
  templateUrl: './historico-upload.html',
  styleUrl: './historico-upload.css',
})
export class HistoricoUpload {
  carregamentos = [
    { id: 1, data: '13/11/2026', arquivo: 'Chegadas_de_turistas_2021.xlsx', responsavel: 'Mariana Silva' },
    { id: 2, data: '12/11/2026', arquivo: 'Turistas_por_estado_2020.xlsx', responsavel: 'Lucas Santos' },
    { id: 3, data: '10/11/2026', arquivo: 'Base_turismo_internacional_2019.xlsx', responsavel: 'Ana Oliveira' },
  ];
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import API_URL from '../../config';

export interface EspecificaKpi {
  titulo: string;
  valor: string;
  detalhe: string;
  icone: string;
}

export interface EspecificaDados {
  kpis: EspecificaKpi[];
  trimestres: {
    labels: string[];
    modais: { nome: string; valores: number[] }[];
  };
  calendario: {
    meses: string[];
    destinos: { destino: string; niveis: ('alta' | 'media' | 'baixa')[] }[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class EspecificaService {
  private endpoint: string = `${API_URL}/especifica`;

  constructor(private http: HttpClient) {}

  getEspecifica(): Observable<EspecificaDados> {
    return this.http.get<EspecificaDados>(this.endpoint);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private endpoint: string = 'http://localhost:3000/especifica';

  constructor(private http: HttpClient) {}

  getEspecifica(): Observable<EspecificaDados> {
    return this.http.get<EspecificaDados>(this.endpoint);
  }
}
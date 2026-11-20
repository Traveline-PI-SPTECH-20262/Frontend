import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import API_URL from '../../config';

export interface Recomendacao {
  id: number;
  nome: string;
  total: number;
  participacao: number;
  nivel: string;
  sazonalidade: string;
}

export interface RecomendacoesDados {
  idplanilha: number | null;
  recomendacoes: Recomendacao[];
  estados: Recomendacao[];
}

@Injectable({ providedIn: 'root' })
export class RecomendacoesService {
  constructor(private http: HttpClient) {}

  getRecomendacoes(idAgencia: number): Observable<RecomendacoesDados> {
    return this.http.get<RecomendacoesDados>(`${API_URL}:3000/recomendacoes/${idAgencia}`);
  }
}

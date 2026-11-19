import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import API_URL from '../../config';
import { KpiVisibilidade } from '../services/configuracoes';

export interface LinhaGrafico {
  nome: string;
  valor: number;
  continente?: string;
}

export interface DashboardKpi {
  chave: keyof KpiVisibilidade;
  titulo: string;
  valor: number;
  variacao: number | null;
  icone: string;
}

export interface Oportunidade {
  pais: string;
  variacao: number | null;
  participacao: number;
  tendencia: string;
  oportunidade: string;
}

export interface DashboardDados {
  planilha: {
    idplanilha: number;
    caminho: string;
    dataHora: string;
  } | null;
  semDados: boolean;
  periodo: string;
  ano: number;
  anoAnterior: number;
  kpis: DashboardKpi[];
  continentes: LinhaGrafico[];
  paises: LinhaGrafico[];
  ufs: LinhaGrafico[];
  sazonalidade: LinhaGrafico[];
  oportunidades: Oportunidade[];
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private http: HttpClient) {}

  getGeral(idAgencia: number): Observable<DashboardDados> {
    return this.http.get<DashboardDados>(`${API_URL}:3000/dashboard/geral/${idAgencia}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import API_URL from '../../config';

export interface RegistroAnalise {
  ano: number;
  mes: number;
  chegadas: number;
  pais?: string;
  continente?: string;
  uf?: string;
}

export interface DadosAnalise {
  idplanilha: number | null;
  paises: RegistroAnalise[];
  ufs: RegistroAnalise[];
}

@Injectable({ providedIn: 'root' })
export class AnaliseService {
  constructor(private http: HttpClient) {}

  getAnalise(idAgencia: number): Observable<DadosAnalise> {
    return this.http.get<DadosAnalise>(`${API_URL}:3000/dashboard/analise/${idAgencia}`);
  }
}

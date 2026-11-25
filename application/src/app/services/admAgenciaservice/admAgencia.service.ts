import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import API_URL from '../../config';

@Injectable({
  providedIn: 'root',
})
export class AgenciaService {
  //private endpoint = `${API_URL}:3000/agencia`;

  constructor(private http: HttpClient) {}

  listarAgencias(): Observable<any> {
    return this.http.get(`${API_URL}:3000/agencia`);
  }

  buscarAgencia(id: number): Observable<any> {
    return this.http.get(`${API_URL}:3000/agencia/${id}`);
  }

  cadastrarAgencia(dados: any): Observable<any> {
    return this.http.post(`${API_URL}:3000/agencia`, dados);
  }

  atualizarAgencia(id: number, dados: any): Observable<any> {
    return this.http.put(`${API_URL}:3000/agencia/${id}`, dados);
  }

  deletarAgencia(id: number): Observable<any> {
    return this.http.delete(`${API_URL}:3000/agencia/${id}`);
  }

  gerarNovoToken(id: number): Observable<any> {
    return this.http.patch(`${API_URL}:3000/agencia/${id}/token`, {});
  }
}

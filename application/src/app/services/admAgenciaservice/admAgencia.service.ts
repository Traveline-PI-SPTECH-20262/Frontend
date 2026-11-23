import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import API_URL from '../../config';

@Injectable({
  providedIn: 'root'
})
export class AgenciaService {

  private endpoint = `${API_URL}:3000/agencia`;

  constructor(private http: HttpClient) {}

  listarAgencias(): Observable<any> {
    return this.http.get(this.endpoint);
  }

  buscarAgencia(id: number): Observable<any> {
    return this.http.get(`${this.endpoint}/${id}`);
  }

  cadastrarAgencia(dados: any): Observable<any> {
    return this.http.post(this.endpoint, dados);
  }

  atualizarAgencia(id: number, dados: any): Observable<any> {
    return this.http.put(`${this.endpoint}/${id}`, dados);
  }

  deletarAgencia(id: number): Observable<any> {
    return this.http.delete(`${this.endpoint}/${id}`);
  }
}
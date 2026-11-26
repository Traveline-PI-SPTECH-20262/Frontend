import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import API_URL from '../../config';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private endpoint: string = `${API_URL}:3000/admin`;

  constructor(private http: HttpClient) {}

  listarUsuarios(idAgencia: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.endpoint}/usuarios/${idAgencia}`);
  }

  editarUsuario(idusuario: number, dados: { nome: string; email: string; cargo: string }): Observable<any> {
    return this.http.put(`${this.endpoint}/usuarios/${idusuario}`, dados);
  }

  deletarUsuario(idusuario: number): Observable<any> {
    return this.http.delete(`${this.endpoint}/usuarios/${idusuario}`);
  }
}
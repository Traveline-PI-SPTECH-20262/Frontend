import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import API_URL from '../../config';

export interface Notificacao {
  idrelatorio: number;
  titulo: string;
  mensagem: string;
  descricao: string;
  dataCriacao: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificacaoService {
  private endpoint: string = `${API_URL}:3000/notificacao`;

  constructor(private http: HttpClient) {}

  listar(idusuario: number, tag?: string): Observable<Notificacao[]> {
    const params: any = tag ? { tag } : {};
    return this.http.get<Notificacao[]>(`${this.endpoint}/${idusuario}`, { params });
  }

  atualizar(idusuario: number, id: number, dados: { titulo: string; mensagem: string; descricao: string }) {
    return this.http.put(`${this.endpoint}/${idusuario}/${id}`, dados);
  }

  excluir(idusuario: number, id: number) {
    return this.http.delete(`${this.endpoint}/${idusuario}/${id}`);
  }
}
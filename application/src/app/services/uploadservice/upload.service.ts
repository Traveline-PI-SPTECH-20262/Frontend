import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import API_URL from '../../config';
import { AuthService } from '../userservices/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private endpoint: string = `${API_URL}:3000/upload`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  enviarArquivo(arquivo: File): Observable<any> {
    const formulario = new FormData();
    const usuario = this.authService.getToken();
    formulario.append('idAgencia', String(usuario?.idAgencia || 0));
    formulario.append('arquivo', arquivo);
    return this.http.post(this.endpoint, formulario);
  }

  buscarHistorico(): Observable<any> {
    const usuario = this.authService.getToken();
    const idAgencia = String(usuario?.idAgencia || 0);
    return this.http.get(`${this.endpoint}/historico/${idAgencia}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import API_URL from '../../config';
import { UsuarioModel } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private endpoint: string = `${API_URL}:3000/user/auth`;

  constructor(private http: HttpClient) {}

  loginEmail(email: string, senha: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    const body = { email, password: senha, tipoLogin: 'auth' }; 
    return this.http.post(this.endpoint, body, { headers });
  }

  loginMicrosoft(): Observable<any> {
    return this.http.get(this.endpoint + '/microsoft');
  }

  public salvarToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public getToken(): UsuarioModel | null {
    const tokenString = localStorage.getItem('token');
    const token = tokenString ? JSON.parse(tokenString) : null;

    const usuario: UsuarioModel | null = {
      id: token?.usuario.id || 0,
      nome: token?.usuario.nome || '',
      email: token?.usuario.email || '',
      senha: token?.usuario.senha || '',
      cargo: token?.usuario.cargo || '',
      idAgencia: token?.usuario.idAgencia || 0,
    }

    return usuario;
  }

  public logout(): void {
    localStorage.removeItem('token');
  }
}
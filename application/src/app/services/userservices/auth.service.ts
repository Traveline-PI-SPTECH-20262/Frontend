import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private endpoint: string = 'http://localhost:3000/user/auth'; 

  constructor(private http: HttpClient) {}

  loginEmail(email: string, senha: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    const body = { email, password: senha, tipoLogin: 'auth' }; 
    return this.http.post(this.endpoint, body, { headers });
  }

  salvarToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
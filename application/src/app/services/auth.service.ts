import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {

  }

  endpoint: string = 'http://localhost:3000/user/auth';

  loginEmail(email: string, password: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    const body = { email, password, tipoLogin: 'auth' };
    return this.http.post(this.endpoint, body, { headers });
  }

  loginGoogle(): Observable<any> {
    return this.http.get(this.endpoint + '/google');
  }

  loginMicrosoft(): Observable<any> {
    return this.http.get(this.endpoint + '/microsoft');
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

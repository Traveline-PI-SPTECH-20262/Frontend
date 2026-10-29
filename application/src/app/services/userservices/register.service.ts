import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import API_URL from '../../config';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private endpoint: string = `${API_URL}/user/register`;

  constructor(private http: HttpClient) {}

  registerUser(userData: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(this.endpoint, userData, { headers });
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {

  }

  registerUser(userData: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post('endpoint', userData, { headers });
  }
}

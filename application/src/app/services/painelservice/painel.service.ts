import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import API_URL from '../../config';

@Injectable({
    providedIn: 'root',
    })
    export class PainelService {
    private endpoint: string = `${API_URL}/painel`;

    constructor(private http: HttpClient) {}
    
    getfunc(idAgencia: Number): Observable<any> {
        return this.http.get(`${this.endpoint}/${idAgencia}`);
    }
}

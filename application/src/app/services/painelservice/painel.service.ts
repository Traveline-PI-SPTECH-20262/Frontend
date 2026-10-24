import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root',
    })
    export class PainelService {
    private endpoint: string = 'http://localhost:3000/painel';

    constructor(private http: HttpClient) {}
    
    getfunc(idAgencia: Number): Observable<any> {
        return this.http.get(`${this.endpoint}/${idAgencia}`);
    }
}

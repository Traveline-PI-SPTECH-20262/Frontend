import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import API_URL from '../../config';

@Injectable({
    providedIn: 'root',
    })
    export class PainelService {
    private endpoint: string = `${API_URL}:3000/painel`;

    constructor(private http: HttpClient) {}
    
    getfunc(idAgencia: Number): Observable<any> {
        return this.http.get(`${this.endpoint}/${idAgencia}`);
    }

    editarFuncionario(idUsuario: number, dados: any): Observable<any> {
        return this.http.put(`${this.endpoint}/${idUsuario}`, dados);
    }

    deletarFuncionario(idUsuario: number): Observable<any> {
        return this.http.delete(`${this.endpoint}/${idUsuario}`);
    }

}

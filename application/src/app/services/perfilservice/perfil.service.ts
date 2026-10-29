import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import API_URL from '../../config';

@Injectable({
    providedIn: 'root',
    })
    export class PerfilService {
    private endpoint: string = `${API_URL}/perfil`;

    constructor(private http: HttpClient) {}

    getPerfil(idUsuario: number,idAgencia: Number): Observable<any> {
        return this.http.get(`${this.endpoint}/${idUsuario}/${idAgencia}`);
    }
}
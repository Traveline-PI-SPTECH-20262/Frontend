import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
    })
    export class PerfilService {
    private endpoint: string = 'http://localhost:3000/perfil';

    constructor(private http: HttpClient) {}

    getPerfil(idUsuario: number): Observable<any> {
        return this.http.get(`${this.endpoint}/${idUsuario}`);
    }
}
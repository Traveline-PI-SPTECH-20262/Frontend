import { KpiVisibilidade } from '../services/configuracoes';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import API_URL from '../../config';

@Injectable({
    providedIn: 'root',
    })
    export class PerfilService {
    private endpoint: string = `${API_URL}:3000/perfil`;

    constructor(private http: HttpClient) {}

    getPerfil(idUsuario: number,idAgencia: Number): Observable<any> {
        return this.http.get(`${this.endpoint}/${idUsuario}/${idAgencia}`);
    }

    posteditarPerfil(idusuario: number, nome: string, email: string) {
    return this.http.post(`${this.endpoint}/${idusuario}`, {
        nome,
        email
    });
    }

    postdeletarPerfil(idusuario: number) {
    return this.http.delete(`${this.endpoint}/${idusuario}` );
    }
    
    getPreferencias(idusuario: number): Observable<any> {
        return this.http.get(`${this.endpoint}/preferencias/${idusuario}`);
    }

    salvarPreferencias(idusuario: number, temaClaro: boolean, kpis: KpiVisibilidade) {
        return this.http.post(`${this.endpoint}/preferencias/${idusuario}`, { temaClaro, ...kpis });
    }
}

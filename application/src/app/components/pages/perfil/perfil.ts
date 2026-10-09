import { Component, ChangeDetectorRef } from '@angular/core';
import { Header } from '../../header/header';
import { PerfilService } from '../../../services/perfilservice/perfil.service';

@Component({
  selector: 'app-perfil',
  imports: [Header],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {
  usuario: any = {};

  constructor(
    private perfilService: PerfilService,
    private cdr: ChangeDetectorRef
  ) {
    console.log("Componente Perfil carregado!");
    this.carregarPerfil();
  }

  carregarPerfil() {
    const dadosSalvos = localStorage.getItem('token') || localStorage.getItem('usuario');
    
    let idUsuario = 0;
    if (dadosSalvos) {
      const objetoSessao = JSON.parse(dadosSalvos);
      idUsuario = objetoSessao.usuario ? objetoSessao.usuario.idusuario : objetoSessao.idusuario;
    }

    console.log("ID extraído para o perfil:", idUsuario);

    if (idUsuario) {
      this.perfilService.getPerfil(idUsuario).subscribe({
        next: (dados) => {
          console.log("Dados que chegaram do backend:", dados);
          this.usuario = dados;
          this.cdr.detectChanges(); 
        },
        error: (erro) => {
          console.error("Erro na requisição do perfil:", erro);
        }
      });
    } else {
      console.warn("Nenhum ID válido encontrado!");
    }
  }
}
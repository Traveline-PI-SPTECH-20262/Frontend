
import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../header/header';
import { PerfilService } from '../../../services/perfilservice/perfil.service';
import {
  ModalEditarPerfil,
  FormularioPerfil
} from '../../modal/modal-perfil/modal-perfil';

@Component({
  selector: 'app-perfil',
  imports: [Header, CommonModule, ModalEditarPerfil],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {

  usuario: any = {};
  agencia: any = {};

  totalPlanilhas: number = 3;
  totalRelatorios: number = 5;

  editando: boolean = false;
  salvando: boolean = false;
  mensagemEdicao: string = '';

  formulario: FormularioPerfil = {
    nome: '',
    email: '',
    cargo: ''
  };

  constructor(
    private perfilService: PerfilService,
    private cdr: ChangeDetectorRef
  ) {
    console.log('Componente Perfil carregado!');
    this.carregarPerfil();
  }

  carregarPerfil() {
    const dadosSalvos =
      localStorage.getItem('token') ||
      localStorage.getItem('usuario');

    let idUsuario = 0;
    let idAgencia = 0;

    if (dadosSalvos) {
      try {
        const objetoSessao = JSON.parse(dadosSalvos);

        idUsuario = objetoSessao.usuario
          ? objetoSessao.usuario.idusuario
          : objetoSessao.idusuario;

        idAgencia = objetoSessao.usuario.idAgencia;

      } catch (erro) {
        console.error('Erro ao ler os dados da sessão:', erro);
      }
    }

    console.log('ID extraído para o perfil:', idUsuario);

    if (idUsuario) {
      this.perfilService.getPerfil(idUsuario, idAgencia).subscribe({
        next: (dados) => {
          console.log('Dados que chegaram do backend:', dados);

          this.usuario = dados?.usuario || {};
          this.agencia = dados?.agencia || {};
          this.cdr.detectChanges();
        },
        error: (erro) => {
          console.error('Erro ao carregar perfil:', erro);
        }
      });
    } else {
      console.warn('Nenhum ID válido encontrado!');
    }
  }

  abrirEdicao() {
    this.formulario = {
      nome: this.usuario.nome || '',
      email: this.usuario.email || '',
      cargo: this.usuario.cargo || ''
    };

    this.mensagemEdicao = '';
    this.editando = true;
  }

  cancelarEdicao() {
    this.editando = false;
    this.mensagemEdicao = '';
  }

  salvarEdicao(dados: FormularioPerfil) {

    this.formulario = dados;

    if (!this.formulario.nome || !this.formulario.email) {
      this.mensagemEdicao = 'Preencha o nome e o e-mail.';
      return;
    }

    this.mensagemEdicao =
      'A atualização ainda precisa ser conectada ao backend.';
  }
}

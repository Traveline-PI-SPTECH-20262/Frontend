
import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../header/header';
import { PerfilService } from '../../../services/perfilservice/perfil.service';
import {ModalEditarPerfil,FormularioPerfil} from '../../modal/modal-perfil/modal-perfil';
import { ModalDeletarPerfil } from '../../modal/modal-delete-perfil/modal-delete-perfil';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [Header, CommonModule, ModalEditarPerfil, ModalDeletarPerfil],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {

  usuario: any = {};
  agencia: any = {};

  totalPlanilhas: string = localStorage.getItem('planilhas')|| '0';
  totalRelatorios: string = localStorage.getItem('relatorios')|| '0';

  editando: boolean = false;
  salvando: boolean = false;
  modalDelecaoAberto: boolean = false;
  deletando: boolean = false;
  mensagemEdicao: string = '';
  mensagemDelecao: string = '';

  formulario: FormularioPerfil = {
    nome: '',
    email: '',
    cargo: ''
  };

  constructor(
    private perfilService: PerfilService,
    private cdr: ChangeDetectorRef,
    private router: Router
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

        idAgencia = objetoSessao.usuario?.idAgencia || objetoSessao.idAgencia || 0;

      } catch (erro) {
        console.error('Erro ao ler os dados da sessão:', erro);
      }
    }

    console.log('ID extraído para o perfil:', idUsuario);

    if (idUsuario) {
      this.perfilService.getPerfil(idUsuario, idAgencia).subscribe({
        next: (dados) => {
          console.log('Dados que chegaram do backend:', dados);
          
          localStorage.setItem('planilhas', dados.planilha?.length);
          localStorage.setItem('relatorios', dados.relatorio?.length);
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
    this.modalDelecaoAberto = false;

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
    }

abrirDeletar() {
    this.editando = false;
    this.mensagemDelecao = '';
    this.modalDelecaoAberto = true;
}

cancelarExclusao() {
    this.modalDelecaoAberto = false;
    this.mensagemDelecao = '';
}

  salvarEdicao(dados: FormularioPerfil) {
    const idusuario = this.usuario.idusuario;

    if (!idusuario) {
      return;
    }

    this.salvando = true;

    this.perfilService.posteditarPerfil(
      idusuario,
      dados.nome,
      dados.email
    ).subscribe({
      next: () => {
        this.usuario.nome = dados.nome;
        this.usuario.email = dados.email;
        localStorage.setItem('token', JSON.stringify({usuario: this.usuario}));

        this.salvando = false;        
        this.editando = false;

        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao editar perfil:', erro);

        this.mensagemEdicao = 'Erro ao salvar informações';
        this.salvando = false;

        this.cdr.detectChanges();
      }
    });
  }
deletarPerfil() {
  

    const idusuario = this.usuario.idusuario;

    if (!idusuario) {
        return;
    }

    this.deletando = true;
    this.mensagemDelecao = '';

    this.perfilService.postdeletarPerfil(idusuario).subscribe({

        next: () => {
            this.modalDelecaoAberto = false;

            localStorage.removeItem('token');
            localStorage.removeItem('usuario');

            this.router.navigate(['/sign']);

        },

        error: (erro) => {

            console.error('Erro ao deletar perfil:', erro);

            this.mensagemDelecao = 'Não foi possível excluir seu perfil.';

            this.deletando = false;

            this.cdr.detectChanges();

        }

    });

}
}

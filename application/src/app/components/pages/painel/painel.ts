
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Header } from '../../header/header';
import { PainelService } from '../../../services/painelservice/painel.service';
import { UsuarioModel } from '../../../models/usuario.model';
import { AuthService } from '../../../services/userservices/auth.service';
import { Modal } from '../../modal/modal';

import {
  ModalEditarPerfil,
  FormularioPerfil
} from '../../modal/modal-perfil/modal-perfil';


@Component({
  selector: 'app-painel',
  imports: [Header, ModalEditarPerfil, Modal],
  templateUrl: './painel.html',
  styleUrl: './painel.css',
})
export class Painel implements OnInit {

  funcionarios: any[] = [];

  funcionarioSelecionado: any = {};

  editando = false;
  visualizando = false;
  excluindo = false;

  salvando = false;
  mensagemEdicao = '';

  formulario: FormularioPerfil = {
    nome: '',
    email: '',
    cargo: ''
  };

  constructor(
    private painelService: PainelService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.carregarfuncionairos();
  }

  ngOnInit(): void {
    const token: UsuarioModel | null = this.authService.getToken();

    if (token && token.cargo !== 'Gerente') {
      window.location.href = '/dashboard';
    }
  }

  carregarfuncionairos(): void {
    const dadosSalvos = localStorage.getItem('token');
    let idAgencia = 0;

    if (dadosSalvos) {
      try {
        const objetoSessao = JSON.parse(dadosSalvos);

        idAgencia = objetoSessao.usuario
          ? objetoSessao.usuario.idAgencia
          : objetoSessao.idAgencia;

      } catch (erro) {
        console.error(erro);
      }
    }

    if (!idAgencia) {
      console.error('ID da agência não encontrado');
      return;
    }

    this.painelService.getfunc(idAgencia).subscribe({
      next: (dados: any) => {
        this.funcionarios = dados[0];
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar funcionários:', erro);
      }
    });
  }

  
  abrirEdicao(funcionario: any) {
    this.funcionarioSelecionado = funcionario;

    this.formulario = {
      nome: funcionario.nome,
      email: funcionario.email,
      cargo: funcionario.cargo
    };

    this.mensagemEdicao = '';
    this.editando = true;
  }

  salvarEdicao(dados: FormularioPerfil) {
    console.log('Editar funcionário:', this.funcionarioSelecionado.idusuario);
    console.log('Dados:', dados);

    this.editando = false;
  }

  cancelarEdicao() {
    this.editando = false;
  }

  abrirVisualizacao(funcionario: any) {
    this.funcionarioSelecionado = funcionario;
    this.visualizando = true;
  }

  fecharVisualizacao() {
    this.visualizando = false;
  }

  abrirExclusao(funcionario: any) {
    this.funcionarioSelecionado = funcionario;
    this.excluindo = true;
  }

  confirmarExclusao() {
    console.log('Excluir funcionário:', this.funcionarioSelecionado.idusuario);

    
    this.excluindo = false;
  }

  cancelarExclusao() {
    this.excluindo = false;
  }
}

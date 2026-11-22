
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
  cadastrando = false;

  salvando = false;
  deletando = false;
  mensagemDelecao = '';
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
      window.location.href = '/main/dashboard';
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

  abrirDeletar(funcionario: any) {
    this.funcionarioSelecionado = funcionario;

    this.formulario = {
      nome: funcionario.nome,
      email: funcionario.email,
      cargo: funcionario.cargo
    };

    this.mensagemDelecao = '';
    this.deletando = true;
  }


salvarEdicao(dados: FormularioPerfil) {
    const idusuario = this.funcionarioSelecionado.idusuario;

    this.salvando = true;

    this.painelService.editarFuncionario(idusuario, dados).subscribe({
        next: (resposta) => {
            console.log('Funcionário atualizado:', resposta);

            this.mensagemEdicao = 'Funcionário atualizado com sucesso!';

            this.salvando = false;
            this.editando = false;

            this.carregarfuncionairos();
        },
        error: (erro) => {
            console.error('Erro ao editar funcionário:', erro);

            this.mensagemEdicao = 'Erro ao atualizar funcionário.';
            this.salvando = false;
        }
    });
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


  deletarPerfil() {
      const idusuario = this.funcionarioSelecionado.idusuario;

      if (!idusuario) {
          return;
      }

      this.deletando = true;
      this.mensagemDelecao = '';

      this.painelService.deletarFuncionario(idusuario).subscribe({

        next: (resposta) => {
            console.log('Funcionário excluído:', resposta);

            this.excluindo = false;
            this.deletando = false;

            this.carregarfuncionairos();
        },

          error: (erro) => {

              console.error('Erro ao deletar funcionario:', erro);

              this.mensagemDelecao = 'Não foi possível excluir o funcionario.';

              this.deletando = false;

              this.cdr.detectChanges();

          }
      });
  }

  abrirExclusao(funcionario: any) {
    this.funcionarioSelecionado = funcionario;
    this.excluindo = true;
  }

  confirmarExclusao() {
    this.deletarPerfil();
  }

  cancelarExclusao() {
    this.excluindo = false;
  }

  abrirCadastro() {
    this.cadastrando = true;
  }

  cancelarCadastro() {
      this.cadastrando = false;
  }
}

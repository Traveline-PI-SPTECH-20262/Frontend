import { Component, ChangeDetectorRef, OnInit } from '@angular/core'; // ALTERADO
import { FormsModule } from '@angular/forms';
import { Header } from '../../header/header';
import { Register } from '../../forms/register/register';
import { RegisterAgencia } from '../../forms/register-agencia/register-agencia';
import { Modal } from '../../modal/modal';
import { AdminService } from '../../../services/adminservice/admin.service'; // NOVO

// NOVO
interface Usuario {
  idusuario: number;
  nome: string;
  email: string;
  cargo: string;
  idAgencia: number;
}

@Component({
  selector: 'app-painel-adm',
  imports: [Header, Register, RegisterAgencia, FormsModule, Modal],
  templateUrl: './painel-adm.html',
  styleUrl: './painel-adm.css'
})
export class PainelAdm implements OnInit { // ALTERADO
  modo = 'cadastrar';
  idAgencia = 1;
  editandoUsuario = false;
  idUsuario = 0;
  mensagemAgencia = '';
  mensagemUsuario = '';

  agencias = [
    { idAgencia: 1, nome: 'Traveline Turismo', cnpj: '12.345.678/0001-90', email: 'contato@travelineturismo.com', telefone: '(11) 99999-1111', dataCadastro: '2026-10-01', codigoAtivacao: 'TRAVELINE001' },
    { idAgencia: 2, nome: 'Global Travel', cnpj: '23.456.789/0001-01', email: 'guilhermesdomingues31@gmail.com', telefone: '(11) 99999-2222', dataCadastro: '2026-10-05', codigoAtivacao: 'GLOBAL002' },
    { idAgencia: 3, nome: 'Mundo Viagens', cnpj: '34.567.890/0001-12', email: 'contato@mundoviagens.com', telefone: '(21) 99999-3333', dataCadastro: '2026-10-10', codigoAtivacao: 'MUNDO003' }
  ];

  usuarios: Usuario[] = []; // ALTERADO (antes era o array com dados fixos)

  // NOVO
  cargosPermitidos = ['Gerente', 'Analista'];
  erroEdicao = '';
  salvando = false;
  usuarioExcluir: Usuario | null = null;
  erroExclusao = '';
  excluindo = false;

  formularioAgencia = { ...this.agencias[0] };
  formularioUsuario = { nome: '', email: '', cargo: '' };

  // NOVO
  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef) {}

  // NOVO
  ngOnInit() {
    this.carregarUsuarios();
  }

  // NOVO
  carregarUsuarios() {
    const agenciaConsultada = this.idAgencia;
    this.adminService.listarUsuarios(agenciaConsultada).subscribe({
      next: (lista) => {
        if (agenciaConsultada !== this.idAgencia) return; // ignora resposta de agência antiga
        this.usuarios = lista;
        this.cdr.detectChanges();
      },
      error: () => {
        this.mensagemUsuario = 'Não foi possível carregar os usuários.';
        this.cdr.detectChanges();
      }
    });
  }

  get usuariosAgencia() {
    const usuarios = [];
    for (const usuario of this.usuarios) {
      if (usuario.idAgencia === this.idAgencia) usuarios.push(usuario);
    }
    return usuarios;
  }

  alterarModo(modo: string) {
    this.modo = modo;
    this.cancelarEdicaoUsuario();
  }

  selecionarAgencia() {
    this.mensagemAgencia = '';
    this.mensagemUsuario = '';
    this.cancelarEdicaoUsuario();

    for (const agencia of this.agencias) {
      if (agencia.idAgencia === this.idAgencia) {
        this.formularioAgencia = { ...agencia };
      }
    }
    this.carregarUsuarios(); // NOVO
  }

  salvarAgencia() {
    for (let indice = 0; indice < this.agencias.length; indice++) {
      if (this.agencias[indice].idAgencia === this.idAgencia) {
        this.agencias[indice] = { ...this.formularioAgencia };
        this.mensagemAgencia = 'Dados da agência atualizados.';
      }
    }
  }

  cancelarEdicaoAgencia() {
    this.selecionarAgencia();
  }

  editarUsuario(idusuario: number) {
    for (const usuario of this.usuarios) {
      if (usuario.idusuario === idusuario && usuario.idAgencia === this.idAgencia) {
        this.idUsuario = usuario.idusuario;
        this.formularioUsuario = {
          nome: usuario.nome,
          email: usuario.email,
          cargo: usuario.cargo
        };
        this.mensagemUsuario = '';
        this.erroEdicao = ''; // NOVO
        this.editandoUsuario = true;
      }
    }
  }

  // ALTERADO (antes estava vazio e só fechava o modal)
  salvarUsuario() {
    if (this.salvando) return;
    this.salvando = true;
    this.erroEdicao = '';

    this.adminService.editarUsuario(this.idUsuario, this.formularioUsuario).subscribe({
      next: (resposta) => {
        this.salvando = false;
        this.mensagemUsuario = resposta.message;
        this.cancelarEdicaoUsuario();
        this.carregarUsuarios();
      },
      error: (erro) => {
        this.salvando = false;
        this.erroEdicao = erro.error?.message || 'Erro ao atualizar o usuário.';
        this.cdr.detectChanges();
      }
    });
  }

  cancelarEdicaoUsuario() {
    this.editandoUsuario = false;
    this.idUsuario = 0;
    this.erroEdicao = ''; // NOVO
  }

  deletarAgencia(){}

  // NOVO
  pedirExclusao(usuario: Usuario) {
    this.usuarioExcluir = usuario;
    this.erroExclusao = '';
  }

  // NOVO
  cancelarExclusao() {
    this.usuarioExcluir = null;
    this.erroExclusao = '';
  }

  // ALTERADO (antes era deletarUsuario(){} vazio)
  deletarUsuario() {
    if (!this.usuarioExcluir || this.excluindo) return;
    this.excluindo = true;
    this.erroExclusao = '';

    this.adminService.deletarUsuario(this.usuarioExcluir.idusuario).subscribe({
      next: (resposta) => {
        this.excluindo = false;
        this.mensagemUsuario = resposta.message;
        this.usuarioExcluir = null;
        this.carregarUsuarios();
      },
      error: (erro) => {
        this.excluindo = false;
        this.erroExclusao = erro.error?.message || 'Erro ao deletar o usuário.';
        this.cdr.detectChanges();
      }
    });
  }
}
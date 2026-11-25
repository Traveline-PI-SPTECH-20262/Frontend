import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Header } from '../../header/header';
import { Register } from '../../forms/register/register';
import { RegisterAgencia } from '../../forms/register-agencia/register-agencia';
import { Modal } from '../../modal/modal';
import { OnInit } from '@angular/core';
import { AgenciaService } from '../../../services/admAgenciaservice/admAgencia.service';

@Component({
  selector: 'app-painel-adm',
  imports: [Header, Register, RegisterAgencia, FormsModule, Modal],
  templateUrl: './painel-adm.html',
  styleUrl: './painel-adm.css',
})
export class PainelAdm implements OnInit {
  modo = 'cadastrar';
  idAgencia = 1;
  editandoUsuario = false;
  idUsuario = 0;
  mensagemAgencia = '';
  mensagemUsuario = '';

  agencias = [
    {
      idAgencia: 1,
      nome: 'Traveline Turismo',
      cnpj: '12.345.678/0001-90',
      email: 'contato@travelineturismo.com',
      telefone: '(11) 99999-1111',
      dataCadastro: '2026-10-01',
      codigoAtivacao: 'TRAVELINE001',
    },
    {
      idAgencia: 2,
      nome: 'Global Travel',
      cnpj: '23.456.789/0001-01',
      email: 'guilhermesdomingues31@gmail.com',
      telefone: '(11) 99999-2222',
      dataCadastro: '2026-10-05',
      codigoAtivacao: 'GLOBAL002',
    },
    {
      idAgencia: 3,
      nome: 'Mundo Viagens',
      cnpj: '34.567.890/0001-12',
      email: 'contato@mundoviagens.com',
      telefone: '(21) 99999-3333',
      dataCadastro: '2026-10-10',
      codigoAtivacao: 'MUNDO003',
    },
  ];

  usuarios = [
    {
      idusuario: 1,
      nome: 'Guilherme Silva',
      email: 'guilherme@travelineturismo.com',
      cargo: 'Administrador',
      idAgencia: 1,
    },
    {
      idusuario: 2,
      nome: 'Ana Souza',
      email: 'ana@travelineturismo.com',
      cargo: 'Analista',
      idAgencia: 1,
    },
    {
      idusuario: 3,
      nome: 'Carlos Oliveira',
      email: 'carlos@globaltravel.com',
      cargo: 'Gerente',
      idAgencia: 2,
    },
    {
      idusuario: 4,
      nome: 'Mariana Costa',
      email: 'mariana@globaltravel.com',
      cargo: 'Analista',
      idAgencia: 2,
    },
    {
      idusuario: 5,
      nome: 'Pedro Santos',
      email: 'pedro@mundoviagens.com',
      cargo: 'Administrador',
      idAgencia: 3,
    },
  ];

  formularioAgencia = { ...this.agencias[0] };
  formularioUsuario = { nome: '', email: '', cargo: '' };

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
  }

  salvarAgencia() {
    this.agenciaService.atualizarAgencia(this.idAgencia, this.formularioAgencia).subscribe({
      next: () => {
        this.mensagemAgencia = 'Dados da agência atualizados com sucesso!';

        this.carregarAgencias();
      },
      error: (erro) => {
        console.error('Erro ao atualizar agência:', erro);
        this.mensagemAgencia = 'Não foi possível atualizar os dados da agência.';
      },
    });
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
          cargo: usuario.cargo,
        };
        this.mensagemUsuario = '';
        this.editandoUsuario = true;
      }
    }
  }

  salvarUsuario() {
    for (const usuario of this.usuarios) {
      if (usuario.idusuario === this.idUsuario && usuario.idAgencia === this.idAgencia) {
      }
    }
    this.cancelarEdicaoUsuario();
  }

  cancelarEdicaoUsuario() {
    this.editandoUsuario = false;
    this.idUsuario = 0;
  }

  deletarAgencia() {
    const confirmar = confirm('Tem certeza que deseja desativar esta agência?');

    if (!confirmar) {
      return;
    }

    this.agenciaService.deletarAgencia(this.idAgencia).subscribe({
      next: () => {
        this.agencias = this.agencias.filter((agencia) => agencia.idAgencia !== this.idAgencia);

        this.mensagemAgencia = 'Agência desativada com sucesso!';

        if (this.agencias.length > 0) {
          this.idAgencia = this.agencias[0].idAgencia;
          this.formularioAgencia = { ...this.agencias[0] };
        } else {
          this.idAgencia = 0;
          this.formularioAgencia = {
            idAgencia: 0,
            nome: '',
            cnpj: '',
            email: '',
            telefone: '',
            dataCadastro: '',
            codigoAtivacao: '',
          };
        }
      },
      error: (erro) => {
        console.error('Erro ao desativar agência:', erro);
        this.mensagemAgencia = 'Não foi possível desativar a agência.';
      },
    });
  }

  deletarUsuario() {}

  constructor(private agenciaService: AgenciaService) {}

  ngOnInit() {
    this.carregarAgencias();
  }

  carregarAgencias() {
    this.agenciaService.listarAgencias().subscribe({
      next: (dados) => {
        this.agencias = dados;

        if (this.agencias.length > 0) {
          this.idAgencia = this.agencias[0].idAgencia;
          this.selecionarAgencia();
        }
      },
      error: (erro) => {
        console.error('Erro ao carregar agências:', erro);
        this.mensagemAgencia = 'Não foi possível carregar as agências.';
      },
    });
  }

  gerarNovoTokenAgencia() {
    const confirmar = confirm(
      'Tem certeza que deseja gerar um novo token? O código anterior deixará de ser válido.',
    );

    if (!confirmar) {
      return;
    }

    this.agenciaService.gerarNovoToken(this.idAgencia).subscribe({
      next: (resposta) => {
        this.formularioAgencia.codigoAtivacao = resposta.token;

        //atuaiza agencia na lista
        const agencia = this.agencias.find((agencia) => agencia.idAgencia === this.idAgencia);

        if (agencia) {
          agencia.codigoAtivacao = resposta.token;
        }
        this.mensagemAgencia = 'Novo token gerado com sucesso!';
      },
      error: (erro) => {
        console.error('Erro ao gerar novo token:', erro);
        this.mensagemAgencia = erro.error?.mensagem || 'Não foi possível gerar um novo token.';
      },
    });
  }
}

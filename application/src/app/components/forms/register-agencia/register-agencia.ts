import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgenciaService } from '../../../services/admAgenciaservice/admAgencia.service';
import { ModalErro } from '../../modal/modal-erro/modal-erro';

@Component({
  selector: 'app-register-agencia',
  imports: [FormsModule, ModalErro],
  templateUrl: './register-agencia.html',
  styleUrl: './register-agencia.css',
})
export class RegisterAgencia {

  @Output() agenciaCadastrada = new EventEmitter<void>();

  nomeAgencia = '';
  emailAgencia = '';
  cnpj = '';
  numero = '';

  modalErroAberto = false;
  mensagemErro = '';

  constructor(private agenciaService: AgenciaService) {}

  cadastrarAgencia() {

    if (!this.nomeAgencia || !this.emailAgencia || !this.cnpj || !this.numero) {
      this.mensagemErro = 'Preencha todos os campos.';
      this.modalErroAberto = true;
      return;
    }

    const hoje = new Date();
    const dataCadastro = [
      hoje.getFullYear(),
      String(hoje.getMonth() + 1).padStart(2, '0'),
      String(hoje.getDate()).padStart(2, '0')
    ].join('-');

    const dados = {
      nome: this.nomeAgencia,
      email: this.emailAgencia,
      cnpj: this.cnpj,
      telefone: this.numero,
      dataCadastro: dataCadastro
    };

    this.agenciaService.cadastrarAgencia(dados).subscribe({
      next: () => {
        alert('Agência cadastrada com sucesso!');

        this.nomeAgencia = '';
        this.emailAgencia = '';
        this.cnpj = '';
        this.numero = '';

        this.agenciaCadastrada.emit();
      },
      error: (erro) => {
        console.error('Erro ao cadastrar agência:', erro);
        this.mensagemErro = erro.error?.mensagem || 'Não foi possível cadastrar a agência.';
        this.modalErroAberto = true;
      }
    });
  }

  fecharErro() {
    this.modalErroAberto = false;
  }
}
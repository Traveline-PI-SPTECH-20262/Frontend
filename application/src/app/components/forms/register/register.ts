import { Component,ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterService } from '../../../services/userservices/register.service';
import { ModalErro } from '../../modal/modal-erro/modal-erro';

@Component({
  selector: 'app-register',
  imports: [FormsModule,ModalErro],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  nome: string = '';
  email: string = '';
  senha: string = '';
  codigoAtivacao: string = '';
  cargo: string = '';


  modalErroAberto = false;
  mensagemErro = '';

  mostrarErro(mensagem: string) {
    this.mensagemErro = mensagem;
    this.modalErroAberto = true;
  }

  fecharErro() {
    this.modalErroAberto = false;
  }
  
  constructor(private registerService: RegisterService, private cdr: ChangeDetectorRef) {}

  register() {
    const userData = {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      codigoAtivacao: this.codigoAtivacao,
      cargo: this.cargo
    };

    this.registerService.registerUser(userData).subscribe({
    next: (response) => {
      console.log('Usuário registrado com sucesso:', response);
      window.location.reload();

    },
    error: (error) => {
      this.mensagemErro = error.error.message 
      this.modalErroAberto = true;
      console.error('Erro ao registrar usuário:', error);
    }
  });
  }
}

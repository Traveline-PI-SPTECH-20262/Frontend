import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterService } from '../../../services/userservices/register.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  nome: string = '';
  email: string = '';
  senha: string = '';
  codigoAtivacao: string = '';
  cargo: string = '';
  
  constructor(private registerService: RegisterService) {}

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
      console.error('Erro ao registrar usuário:', error);
    }
  });
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterService } from '../../../services/register.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  constructor(private registerService: RegisterService) {}

  nome: string = '';
  email: string = '';
  senha: string = '';

  register() {
    const userData = {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
    };

    this.registerService.registerUser(userData).subscribe({
      next: (response) => {
        console.log('Usuário registrado com sucesso:', response);
      },
      error: (error) => {
        console.error('Erro ao registrar usuário:', error);
      }
    });
  }
}

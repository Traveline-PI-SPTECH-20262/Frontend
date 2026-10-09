import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/userservices/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  senha: string = '';
  email: string = '';

  constructor(private authService: AuthService,private router: Router) {}

  login() {
    console.log('Email:', this.email);
    console.log('Senha:', this.senha);
    this.authService.loginEmail(this.email, this.senha).subscribe({
        next: (response) => {
        const usuario = response.usuario;
        console.log('Login bem-sucedido:', response.usuario);
        this.router.navigate(['/dashboard'])
        console.log('ID do usuário:', usuario.idusuario);
        const token = JSON.stringify({usuario});

        if(response) {
          this.authService.salvarToken(token);
        }
        
      },
      error: (error) => {
        console.error('Erro ao fazer login:', error);
      }
    })
  }

  
}

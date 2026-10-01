import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, AuthService],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  senha: string = '';
  email: string = '';

  constructor(private authService: AuthService) {}

  login() {
    this.authService.loginEmail(this.email, this.senha).subscribe({
        next: (response) => {
        const token = response.token;

        if(token) {
          this.authService.salvarToken(token);
        }
        
      },
      error: (error) => {
        console.error('Erro ao fazer login:', error);
      }
    }
    )
  }

}

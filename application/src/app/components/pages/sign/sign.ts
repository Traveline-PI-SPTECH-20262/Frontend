import { Component } from '@angular/core';
import { Login } from '../../forms/login/login';
import { Register } from '../../forms/register/register';
import { AuthService } from '../../../services/userservices/auth.service';

@Component({
  selector: 'app-sign',
  imports: [Login, Register],
  templateUrl: './sign.html',
  styleUrl: './sign.css',
})
export class Sign {
  mode: string = 'login';

  constructor(private authService: AuthService) {}

  switchMode(mode: string) {
    this.mode = mode;
  }

  loginGoogle() {
    this.authService.loginGoogle().subscribe({
      next: (response) => {
        const token = JSON.stringify(response.token);

        if(token) {
          this.authService.salvarToken(token);
        }
      },
      error: (error) => {
        console.error('Erro ao fazer login com Google:', error);
      }
    })
  }

  loginMicrosoft() {
    this.authService.loginMicrosoft().subscribe({
      next: (response) => {
        const token = response.token;

        if(token) {
          this.authService.salvarToken(token)
        }
      },
      error: (error) => {
        console.error('Erro ao fazer login com Microsoft:', error);
      }
    })
  }

}

import { Component,ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/userservices/auth.service';
import { Router } from '@angular/router';
import { ModalErro } from '../../modal/modal-erro/modal-erro';


@Component({
  selector: 'app-login',
  imports: [FormsModule,ModalErro],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  senha: string = '';
  email: string = '';

  modalErroAberto = false;
  mensagemErro = '';

  mostrarErro(mensagem: string) {
    this.mensagemErro = mensagem;
    this.modalErroAberto = true;
  }

  fecharErro() {
    this.modalErroAberto = false;
  }

  constructor(private authService: AuthService,private router: Router,private cdr: ChangeDetectorRef) {}

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
        this.mensagemErro = error.error.message;
        this.modalErroAberto = true;
        this.cdr.detectChanges();
      }
    })
  }

  
}

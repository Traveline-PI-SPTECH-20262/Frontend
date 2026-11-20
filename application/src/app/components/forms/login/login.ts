import { Component,ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/userservices/auth.service';
import { Router } from '@angular/router';
import { ConfiguracoesService, KpiVisibilidade } from '../../../services/services/configuracoes';
import { ModalErro } from '../../modal/modal-erro/modal-erro';


@Component({
  selector: 'app-login',
  imports: [FormsModule,ModalErro],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  senha: string = '';
  verSenha = false;
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

  constructor(private authService: AuthService,private router: Router,private cdr: ChangeDetectorRef, private configuracoes: ConfiguracoesService) {}

  login() {
    console.log('Email:', this.email);
    console.log('Senha:', this.senha);
    this.authService.loginEmail(this.email, this.senha).subscribe({
        next: (response) => {
        const usuario = response.usuario;
        console.log('Login bem-sucedido:', response.usuario);
        console.log('teste:', response);
   
        console.log('ID do usuário:', usuario.idusuario);
        const token = JSON.stringify({usuario,});
        const preferencias = JSON.stringify({preferencias: response.preferencias});

        if(response) {
          this.authService.salvarToken(token);
          this.authService.salvarPreferencias(preferencias);
          const dados = response.preferencias;
          const kpis: KpiVisibilidade = {
            totalTuristas: Boolean(dados.totalTuristas),
            viaAerea: Boolean(dados.viaAerea),
            viaTerrestre: Boolean(dados.viaTerrestre),
            viaMaritima: Boolean(dados.viaMaritima),
            viaFluvial: Boolean(dados.viaFluvial),
            paisesEmissores: Boolean(dados.paisesEmissores)
          };
          this.configuracoes.salvarPreferencias(dados.temaClaro ? 'claro' : 'escuro', kpis);
          if (usuario.cargo === 'Administrador') {
            this.router.navigate(['/main/painel-adm']);
          }else{
            this.router.navigate(['/main/dashboard']);
          }
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

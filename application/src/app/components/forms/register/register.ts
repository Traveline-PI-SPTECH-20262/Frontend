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
  verSenha = false;
  codigoAtivacao: string = '';
  idCargo: number | null = null;
  cargos: { idCargo: number, cargo: string }[] = [];


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

  ngOnInit() {
    this.registerService.getCargos().subscribe({
      next: (cargos) => {
        this.cargos = cargos;
        this.cdr.detectChanges();
      },
      error: (erro) => console.error('Erro ao carregar cargos:', erro)
    });
  }

  register() {
    const userData = {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      codigoAtivacao: this.codigoAtivacao,
      idCargo: this.idCargo
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

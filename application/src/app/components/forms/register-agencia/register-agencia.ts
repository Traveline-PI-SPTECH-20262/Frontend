import { Component,ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterService } from '../../../services/userservices/register.service';
import { ModalErro } from '../../modal/modal-erro/modal-erro';

@Component({
  selector: 'app-register-agencia',
  imports: [FormsModule, ModalErro],
  templateUrl: './register-agencia.html',
  styleUrl: './register-agencia.css',
})
export class RegisterAgencia {
  nomeAgencia: string = '';
  emailAgencia: string = '';
  cnpj: string = '';
  numero: string = '';

  


  modalErroAberto = false;
  mensagemErro = '';

  cadastrarAgencia(){}
  

  fecharErro(){}
}



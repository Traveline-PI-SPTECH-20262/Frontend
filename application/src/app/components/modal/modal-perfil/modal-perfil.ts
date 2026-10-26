
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Modal } from '../modal';

export interface FormularioPerfil {
  nome: string;
  cargo: string;
  email: string;
}

@Component({
  selector: 'app-modal-editar-perfil',
  standalone: true,
  imports: [FormsModule, Modal],
  templateUrl: './modal-perfil.html',
  styleUrl: './modal-perfil.css'
})
export class ModalEditarPerfil {

  @Input() aberto = false;
  @Input() salvando = false;
  @Input() mensagemEdicao = '';

  @Input() formulario: FormularioPerfil = {
    nome: '',
    cargo: '',
    email: ''
  };

  @Output() cancelar = new EventEmitter<void>();
  @Output() salvar = new EventEmitter<FormularioPerfil>();

  cancelarEdicao(): void {
    this.cancelar.emit();
  }

  salvarEdicao(): void {
    if (this.salvando) {
      return;
    }

    this.salvar.emit({ ...this.formulario });
  }
}


import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { Modal } from '../modal';

@Component({
  selector: 'app-modal-deletar-perfil',
  standalone: true,
  imports: [Modal],
  templateUrl: './modal-delete-perfil.html',
  styleUrl: './modal-delete-perfil.css'
})
export class ModalDeletarPerfil {

  @Input() aberto = false;
  @Input() deletando = false;
  @Input() mensagemDelecao = '';

  @Output() cancelar = new EventEmitter<void>();
  @Output() deletar = new EventEmitter<void>();

  cancelarDelecao(): void {
    this.cancelar.emit();
  }

  deletarPerfil(): void {
    if (this.deletando) {
      return;
    }

    this.deletar.emit();
  }
}

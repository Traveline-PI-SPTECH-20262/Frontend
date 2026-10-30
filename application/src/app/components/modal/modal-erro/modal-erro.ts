import { Component,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-erro',
  imports: [],
  templateUrl: './modal-erro.html',
  styleUrl: './modal-erro.css',
})
export class ModalErro {
@Input() aberto = false;
  @Input() mensagemErro = '';
  @Output() fecharErro = new EventEmitter<void>();

  fecharModalErro(): void {
    this.fecharErro.emit();
  }
}

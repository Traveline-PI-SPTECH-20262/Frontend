import {Component,EventEmitter,Input,Output} from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.html',
  styleUrl: './modal.css'
})
export class Modal {

  @Input() aberto = false;
  @Input() titulo = '';
  @Input() descricao = '';

  @Output() fechar = new EventEmitter<void>();

  fecharModal(): void {
    this.fechar.emit();
  }
}

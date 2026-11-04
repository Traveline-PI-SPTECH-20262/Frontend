import { Component,Input } from '@angular/core';
import { CustomComponent } from '../custom/custom';

@Component({
  selector: 'app-header',
  imports: [CustomComponent],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
    @Input() titulo = '';
    @Input() descricao= '';

    aberto: boolean = false;

abrirModal() {
  this.aberto = true;
}

fecharModal() {
  this.aberto = false;
}

}


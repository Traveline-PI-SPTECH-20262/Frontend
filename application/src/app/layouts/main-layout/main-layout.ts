import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [Navbar, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  verificarLogin() {
    try {
      const token = localStorage.getItem('token') || 'null';
      if (token === 'null') {
        console.log('Usuário não está logado. Redirecionando para a página de login...');
        window.location.href = '/sign';
      } else {
        console.log('Usuário está logado.');
        window.location.href = '/dashboard';

      }
    } catch (error) {
      console.error('Erro ao verificar login:', error);
    }
  }

  constructor() {
    this.verificarLogin();
  }
}

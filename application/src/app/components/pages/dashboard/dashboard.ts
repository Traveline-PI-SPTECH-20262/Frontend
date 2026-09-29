import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  verificarLogin() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('Usuário não está logado. Redirecionando para a página de login...');
        // Redirecionar para a página de login
        window.location.href = '/sign';
      } else {
        console.log('Usuário está logado.');
      }
    } catch (error) {
      console.error('Erro ao verificar login:', error);
    }
  }

  constructor() {
    this.verificarLogin();
  }
}

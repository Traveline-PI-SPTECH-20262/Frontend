import { Component, OnInit } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Router, RouterOutlet } from '@angular/router';
import API_URL from '../../config';

@Component({
  selector: 'app-main-layout',
  imports: [Navbar, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout implements OnInit {

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    if (this.router.url === '/') {
      window.location.href = `${API_URL}:4000`;
    }
  }

  

  /*
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
    */
}

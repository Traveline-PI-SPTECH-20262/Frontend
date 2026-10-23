import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

enum Pagina {
  Dashboard = 'dashboard',
  Painel = 'painel'
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(private router: Router) {}
  Logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    sessionStorage.clear(); 
    this.router.navigate(['/sign']);
  }
}

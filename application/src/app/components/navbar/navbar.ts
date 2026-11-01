import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../services/userservices/auth.service';
import { UsuarioModel } from '../../models/usuario.model';

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
  token: UsuarioModel | null = AuthService.prototype.getToken();
  tipoUsuario: string | null = this.token?.cargo || null;

  Logout(): void {
    AuthService.prototype.logout();
    this.router.navigate(['/sign']);
  }
}

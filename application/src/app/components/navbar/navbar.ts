import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

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

}

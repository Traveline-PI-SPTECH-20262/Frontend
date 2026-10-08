import { Component } from '@angular/core';
import { Header } from '../../header/header';

@Component({
  selector: 'app-painel',
  imports: [Header],
  templateUrl: './painel.html',
  styleUrl: './painel.css',
})
export class Painel {
  funcionarios = [
    {
      id: 1,
      nome: 'João Silva',
      cargo: 'Desenvolvedor',
      email: 'joao@email.com'
    },
    {
      id: 2,
      nome: 'Maria Santos',
      cargo: 'Analista',
      email: 'maria@email.com'
    },
    {
      id: 3,
      nome: 'Carlos Oliveira',
      cargo: 'Gerente',
      email: 'carlos@email.com'
    }
  ];
}

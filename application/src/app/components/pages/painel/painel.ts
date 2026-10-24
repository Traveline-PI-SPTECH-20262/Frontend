import { Component } from '@angular/core';
import { Header } from '../../header/header';
import {PainelService} from '../../../services/painelservice/painel.service';

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
    },
    {
      id: 4,
      nome: 'Guilherme Oliveira Oliveira Oliveira Oliveira',
      cargo: 'Estagiario',
      email: 'guilherme@email.com'
    }
  ];
  
  /*  PREPARAÇÃO PARA O BACK DA TELA DO PAINEL
  constructor(private painelService: PainelService) {}

  
  carregarfuncionairos(): void{
    const dados = localStorage.getItem('usuario') 
    let idAgencia: number = 0;
  if (dados) {
      try {
          const objetoSessao = JSON.parse(dados);
          idAgencia = objetoSessao.usuario.idAgencia;

      } catch (erro) {
        console.error('Erro ao ler os dados da sessão:', erro);
      }
    }
    this.painelService.getfunc(idAgencia).subscribe({
      next: (dados: any) => {
        
    },
  })
}
  */
}

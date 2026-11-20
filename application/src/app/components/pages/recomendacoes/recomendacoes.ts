import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Header } from '../../header/header';
import { AuthService } from '../../../services/userservices/auth.service';
import { RecomendacoesService, Recomendacao } from '../../../services/recomendacoesservice/recomendacoes.service';

@Component({
  selector: 'app-recomendacoes',
  imports: [Header],
  templateUrl: './recomendacoes.html',
  styleUrl: './recomendacoes.css'
})
export class Recomendacoes implements OnInit {
  recomendacoes: Recomendacao[] = [];
  listas: { titulo: string; itens: Recomendacao[] }[] = [];
  idPlanilha: number | null = null;
  carregando = false;
  erro = '';

  constructor(
    private authService: AuthService,
    private recomendacoesService: RecomendacoesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const usuario = this.authService.getToken();
    if (!usuario?.idAgencia) return;

    this.carregando = true;
    this.recomendacoesService.getRecomendacoes(usuario.idAgencia).subscribe({
      next: (dados) => {
        this.idPlanilha = dados.idplanilha;
        this.recomendacoes = dados.recomendacoes.slice(0, 25);
        this.listas = [
          { titulo: 'Países que mais enviam turistas', itens: this.recomendacoes },
          { titulo: 'Estados com mais entradas de turistas', itens: dados.estados.slice(0, 25) }
        ];
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar recomendações:', erro);
        this.erro = 'Não foi possível carregar as recomendações.';
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }

  numero(valor: number) {
    return valor.toLocaleString('pt-BR');
  }

  percentual(valor: number) {
    return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%';
  }
}

import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Header } from '../../header/header';
import { AuthService } from '../../../services/userservices/auth.service';
import { Notificacao, NotificacaoService } from '../../../services/notificacaoservice/notificacao.service';

@Component({
  selector: 'app-relatorios',
  imports: [Header],
  templateUrl: './relatorios.html',
  styleUrl: './relatorios.css',
})
export class Relatorios implements OnInit, OnDestroy {
  lista = signal<Notificacao[]>([]);
  mensagemErro = signal('');
  tagSelecionada = '';
  private temporizador: any;

  constructor(
    private authService: AuthService,
    private notificacaoService: NotificacaoService
  ) {}

  ngOnInit() {
    this.carregar();
    // busca de novo a cada 30 segundos, para mostrar as notificações novas
    this.temporizador = setInterval(() => this.carregar(), 30000);
  }

  ngOnDestroy() {
    clearInterval(this.temporizador);
  }

  carregar() {
    const idusuario = this.authService.getToken()?.id;
    if (!idusuario) {
      this.mensagemErro.set('Usuário não identificado. Faça login novamente.');
      return;
    }

    this.notificacaoService.listar(idusuario, this.tagSelecionada).subscribe({
      next: (dados) => {
        this.lista.set(dados);
        this.mensagemErro.set('');
      },
      error: () => this.mensagemErro.set('Não foi possível carregar as notificações.')
    });
  }

  filtrar(event: Event) {
    this.tagSelecionada = (event.target as HTMLSelectElement).value;
    this.carregar();
  }

  excluir(notificacao: Notificacao) {
    const idusuario = this.authService.getToken()?.id;
    if (!idusuario) return;

    this.notificacaoService.excluir(idusuario, notificacao.idrelatorio).subscribe({
      next: () => this.lista.update((l) => l.filter((n) => n.idrelatorio !== notificacao.idrelatorio)),
      error: () => this.mensagemErro.set('Não foi possível excluir a notificação.')
    });
  }
}
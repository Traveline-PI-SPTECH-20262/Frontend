
import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { Header } from '../../header/header';
import { PainelService } from '../../../services/painelservice/painel.service';
import { UsuarioModel } from '../../../models/usuario.model';
import { AuthService } from '../../../services/userservices/auth.service';

@Component({
  selector: 'app-painel',
  imports: [Header],
  templateUrl: './painel.html',
  styleUrl: './painel.css',
})
export class Painel implements OnInit {

  ngOnInit(): void {
    const token: UsuarioModel | null = this.authService.getToken();

    if (token) {
      const tipoUsuario: string | null = token.cargo || null;

      if (tipoUsuario !== 'Gerente') {
        window.location.href = '/dashboard';
      }
    }
  }

  funcionarios: any[] = [];
  constructor(
    private painelService: PainelService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.carregarfuncionairos();
  }
 carregarfuncionairos(): void {
  const dadosSalvos = localStorage.getItem('token');
  let idAgencia;

  if (dadosSalvos) {
    try {
      const objetoSessao = JSON.parse(dadosSalvos);
      idAgencia = objetoSessao.usuario
        ? objetoSessao.usuario.idAgencia
        : objetoSessao.idAgencia;

    } catch (erro) {
      console.error( erro);
    }
  }
  if (!idAgencia) {
    console.error('ID não encontrado');
    return;
  }

  this.painelService.getfunc(idAgencia).subscribe({
    next: (dados: any) => {
      console.log('Funcionários:', dados[0]);
      this.funcionarios = dados[0];
      this.cdr.detectChanges();
    },
    error: (erro) => {
      console.error('Erro ao carregar funcionários:', erro);
    }
  });
}
}

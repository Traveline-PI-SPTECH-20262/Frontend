import { Component, ChangeDetectorRef } from '@angular/core';
import { Header } from '../../header/header';
import { HistoricoUpload } from '../../historico-upload/historico-upload';
import { UploadService } from '../../../services/uploadservice/upload.service';

@Component({
  selector: 'app-apl',
  imports: [Header, HistoricoUpload],
  templateUrl: './upl.html',
  styleUrl: './upl.css'
})
export class Upl {
  selectedFile: File | null = null;
  enviando = false;
  mensagem = '';
  erroEnvio = false;

  constructor(private uploadService: UploadService, private cdr: ChangeDetectorRef) {}

  selecionarArquivo(arquivo: File | null) {
    this.mensagem = '';
    this.erroEnvio = false;
    this.selectedFile = null;

    if (!arquivo) return;

    const nome = arquivo.name.toLowerCase();
    if (!nome.endsWith('.xlsx') && !nome.endsWith('.xls')) {
      this.mensagem = 'Selecione um arquivo Excel (.xlsx ou .xls).';
      this.erroEnvio = true;
      return;
    }

    if (arquivo.size > 20 * 1024 * 1024) {
      this.mensagem = 'O arquivo deve ter no máximo 20 MB.';
      this.erroEnvio = true;
      return;
    }

    this.selectedFile = arquivo;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selecionarArquivo(input.files?.[0] || null);
  }

  receberArquivo(event: DragEvent, input: HTMLInputElement) {
    event.preventDefault();
    if (this.enviando) return;
    input.value = '';
    this.selecionarArquivo(event.dataTransfer?.files[0] || null);
  }

  removeFile(input: HTMLInputElement) {
    if (this.enviando) return;
    this.selectedFile = null;
    input.value = '';
    this.mensagem = '';
    this.erroEnvio = false;
  }

  enviarArquivo(input: HTMLInputElement) {
    if (!this.selectedFile || this.enviando) return;

    this.enviando = true;
    this.mensagem = '';
    this.erroEnvio = false;

    this.uploadService.enviarArquivo(this.selectedFile).subscribe({
      next: (resposta) => {
        this.selectedFile = null;
        input.value = '';
        this.enviando = false;
        this.mensagem = resposta.mensagem;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        this.enviando = false;
        this.erroEnvio = true;
        this.mensagem = erro.error?.mensagem || 'Não foi possível enviar o arquivo. Verifique se o backend está rodando.';
        this.cdr.detectChanges();
      }
    });
  }
}

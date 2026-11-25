import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../services/uploadservice/upload.service';

interface Carregamento {
  idplanilha: number;
  caminho: string;
  nome: string;
  dataHora: any;
  situacao: string;
  dataInicio: any;
  dataConclusao: any;
  agencia_idAgencia: number;
  criado_em: any;
}

@Component({
  selector: 'app-historico-upload',
  imports: [],
  templateUrl: './historico-upload.html',
  styleUrl: './historico-upload.css',
})
export class HistoricoUpload implements OnInit {

  constructor(private uploadService: UploadService) {}
  carregamentos: Carregamento[] = [];

  ngOnInit(): void {
    this.uploadService.buscarHistorico().subscribe(
      (response) => {
        console.log('Histórico de uploads:', response.historico);
        const lista: Carregamento[] = []
        for (const item of response.historico) {
          const dataParteUm = item.criado_em.split('T')[0];
          const dataParteDois = item.criado_em.split('T')[1].split('.')[0];
          const carregamento: Carregamento = {
            idplanilha: item.idplanilha,
            caminho: item.caminho,
            nome: item.nome,
            dataHora: item.dataHora,
            situacao: item.situacao,
            dataInicio: item.dataInicio,
            dataConclusao: item.dataConclusao,
            agencia_idAgencia: item.agencia_idAgencia,
            criado_em: `${dataParteUm} ${dataParteDois}`
          };
          lista.push(carregamento);
        }
        this.carregamentos = lista;
      },
      (error) => {
        console.error('Erro ao buscar histórico de uploads:', error);
      }
    );
  }
}

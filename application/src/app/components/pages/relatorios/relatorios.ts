import { Component } from '@angular/core';
import { Header } from '../../header/header';

@Component({
  selector: 'app-relatorios',
  imports: [Header],
  templateUrl: './relatorios.html',
  styleUrl: './relatorios.css',
})
export class Relatorios {
  listarelatorios = [
    {
      id:1,
      titulo:"Crescimento de turistas identificado",
      mensagem:"Oportunidade",
      descricao:"O número de turistas provenientes do Chile apresentou crescimento de 12,4% em relação ao período anterior. Esse mercado pode representar uma oportunidade para agências de turismo receptivo.",
      origem: "Análise de países emissores"
    },
    {
      id:2,
      titulo:"Período de alta movimentação",
      mensagem:"Sazonalidade", 
      descricao:"A análise mensal identificou maior concentração de chegadas internacionais em janeiro. Considere esse período ao planejar campanhas e ofertas.",
      origem:"Sazonalidade turística"
    },
    {
      id:3,
      titulo:"Falha na importação de dados",
      mensagem:"Erro",
      descricao: "O arquivo XLSX enviado apresenta campos incompatíveis com o modelo esperado. Revise a estrutura da planilha e tente novamente.",
    Origem: "Processamento de arquivos"
    }
  ]

}

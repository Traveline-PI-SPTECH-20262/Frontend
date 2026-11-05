import { Component } from '@angular/core';
import { Header } from '../../header/header';
@Component({
  selector: 'app-recomendacoes',
  imports: [Header],
  templateUrl: './recomendacoes.html',
  styleUrl: './recomendacoes.css',
})
export class Recomendacoes {

  recomendacoes = [
  {
    id: 1,
    pais: "Estados Unidos",
    variacao_2021_2020: "+8.1%",
    participacao_2021: "28.4%",
    tendencia: "Subir",
    oportunidade: "Alta"
  },
  {
    id: 2,
    pais: "Alemanha",
    variacao_2021_2020: "-2.3%",
    participacao_2021: "14.1%",
    tendencia: "Cair",
    oportunidade: "Média"
  },
  {
    id: 3,
    pais: "Japão",
    variacao_2021_2020: "+4.6%",
    participacao_2021: "12.3%",
    tendencia: "Subir",
    oportunidade: "Média"
  },
  {
    id: 4,
    pais: "Canadá",
    variacao_2021_2020: "+6.0%",
    participacao_2021: "10.0%",
    tendencia: "Subir",
    oportunidade: "Alta"
  },
  {
    id: 5,
    pais: "Reino Unido",
    variacao_2021_2020: "+3.4%",
    participacao_2021: "9.5%",
    tendencia: "Manter",
    oportunidade: "Média"
  },
  {
    id: 6,
    pais: "França",
    variacao_2021_2020: "+5.2%",
    participacao_2021: "8.9%",
    tendencia: "Subir",
    oportunidade: "Média"
  },
  {
    id: 7,
    pais: "China",
    variacao_2021_2020: "+15.8%",
    participacao_2021: "42.0%",
    tendencia: "Subir",
    oportunidade: "Alta"
  },
  {
    id: 8,
    pais: "Austrália",
    variacao_2021_2020: "+1.9%",
    participacao_2021: "7.2%",
    tendencia: "Manter",
    oportunidade: "Média"
  },
  {
    id: 9,
    pais: "Argentina",
    variacao_2021_2020: "-4.1%",
    participacao_2021: "5.5%",
    tendencia: "Cair",
    oportunidade: "Baixa"
  },
  {
    id: 10,
    pais: "Chile",
    variacao_2021_2020: "+7.3%",
    participacao_2021: "4.8%",
    tendencia: "Subir",
    oportunidade: "Alta"
  },
  {
    id: 11,
    pais: "Uruguai",
    variacao_2021_2020: "+2.8%",
    participacao_2021: "3.6%",
    tendencia: "Manter",
    oportunidade: "Média"
  },
  {
    id: 12,
    pais: "Paraguai",
    variacao_2021_2020: "-1.5%",
    participacao_2021: "2.9%",
    tendencia: "Cair",
    oportunidade: "Baixa"
  },
  {
    id: 13,
    pais: "Portugal",
    variacao_2021_2020: "+9.2%",
    participacao_2021: "6.4%",
    tendencia: "Subir",
    oportunidade: "Alta"
  },
  {
    id: 14,
    pais: "Itália",
    variacao_2021_2020: "+5.7%",
    participacao_2021: "5.1%",
    tendencia: "Subir",
    oportunidade: "Média"
  },
  {
    id: 15,
    pais: "Espanha",
    variacao_2021_2020: "+3.1%",
    participacao_2021: "4.5%",
    tendencia: "Manter",
    oportunidade: "Média"
  },
  {
    id: 16,
    pais: "México",
    variacao_2021_2020: "+11.4%",
    participacao_2021: "3.8%",
    tendencia: "Subir",
    oportunidade: "Alta"
  },
  {
    id: 17,
    pais: "Colômbia",
    variacao_2021_2020: "+8.6%",
    participacao_2021: "3.2%",
    tendencia: "Subir",
    oportunidade: "Alta"
  },
  {
    id: 18,
    pais: "Peru",
    variacao_2021_2020: "-3.2%",
    participacao_2021: "2.4%",
    tendencia: "Cair",
    oportunidade: "Baixa"
  },
  {
    id: 19,
    pais: "Holanda",
    variacao_2021_2020: "+2.5%",
    participacao_2021: "2.1%",
    tendencia: "Manter",
    oportunidade: "Média"
  }
]
}
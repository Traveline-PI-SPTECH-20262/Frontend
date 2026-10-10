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
    pais: "Brasil",
    variacao_2021_2020: "+12.5%",
    participacao_2021: "35.2%",
    tendencia: "Alta",
    oportunidade: "Expansão de Mercado"
  },
  {
    id: 2,
    pais: "Estados Unidos",
    variacao_2021_2020: "+8.1%",
    participacao_2021: "28.4%",
    tendencia: "Estável",
    oportunidade: "Parcerias Estratégicas"
  },
  {
    id: 3,
    pais: "Alemanha",
    variacao_2021_2020: "-2.3%",
    participacao_2021: "14.1%",
    tendencia: "Queda",
    oportunidade: "Otimização de Custos"
  },
  {
    id: 4,
    pais: "Japão",
    variacao_2021_2020: "+4.6%",
    participacao_2021: "12.3%",
    tendencia: "Alta",
    oportunidade: "Inovação Tecnológica"
  },
  {
    id: 5,
    pais: "Canadá",
    variacao_2021_2020: "+6.0%",
    participacao_2021: "10.0%",
    tendencia: "Estável",
    oportunidade: "Novos Canais de Distribuição"
  },
  {
    id: 6,
    pais: "Reino Unido",
    variacao_2021_2020: "+3.4%",
    participacao_2021: "9.5%",
    tendencia: "Estável",
    oportunidade: "Serviços Digitais"
  },
  {
    id: 7,
    pais: "França",
    variacao_2021_2020: "+5.2%",
    participacao_2021: "8.9%",
    tendencia: "Alta",
    oportunidade: "Sustentabilidade"
  },
  {
    id: 8,
    pais: "China",
    variacao_2021_2020: "+15.8%",
    participacao_2021: "42.0%",
    tendencia: "Alta",
    oportunidade: "Produção em Massa"
  },
  {
    id: 9,
    pais: "Austrália",
    variacao_2021_2020: "+1.9%",
    participacao_2021: "7.2%",
    tendencia: "Estável",
    oportunidade: "Mineração e Energia"
  },
  {
    id: 10,
    pais: "Argentina",
    variacao_2021_2020: "-4.1%",
    participacao_2021: "5.5%",
    tendencia: "Queda",
    oportunidade: "Agronegócio"
  },
{
  id: 11,
  pais: "Chile",
  variacao_2021_2020: "+7.3%",
  participacao_2021: "4.8%",
  tendencia: "Alta",
  oportunidade: "Pacotes de Ecoturismo"
},
{
  id: 12,
  pais: "Uruguai",
  variacao_2021_2020: "+2.8%",
  participacao_2021: "3.6%",
  tendencia: "Estável",
  oportunidade: "Roteiros Regionais"
},
{
  id: 13,
  pais: "Paraguai",
  variacao_2021_2020: "-1.5%",
  participacao_2021: "2.9%",
  tendencia: "Queda",
  oportunidade: "Promoções para Baixa Temporada"
},
{
  id: 14,
  pais: "Portugal",
  variacao_2021_2020: "+9.2%",
  participacao_2021: "6.4%",
  tendencia: "Alta",
  oportunidade: "Roteiros Culturais"
},
{
  id: 15,
  pais: "Itália",
  variacao_2021_2020: "+5.7%",
  participacao_2021: "5.1%",
  tendencia: "Alta",
  oportunidade: "Turismo Gastronômico"
},
{
  id: 16,
  pais: "Espanha",
  variacao_2021_2020: "+3.1%",
  participacao_2021: "4.5%",
  tendencia: "Estável",
  oportunidade: "Parcerias com Agências Locais"
},
{
  id: 17,
  pais: "México",
  variacao_2021_2020: "+11.4%",
  participacao_2021: "3.8%",
  tendencia: "Alta",
  oportunidade: "Pacotes de Sol e Praia"
},
{
  id: 18,
  pais: "Colômbia",
  variacao_2021_2020: "+8.6%",
  participacao_2021: "3.2%",
  tendencia: "Alta",
  oportunidade: "Turismo de Natureza"
},
{
  id: 19,
  pais: "Peru",
  variacao_2021_2020: "-3.2%",
  participacao_2021: "2.4%",
  tendencia: "Queda",
  oportunidade: "Campanhas de Retomada"
},
{
  id: 20,
  pais: "Holanda",
  variacao_2021_2020: "+2.5%",
  participacao_2021: "2.1%",
  tendencia: "Estável",
  oportunidade: "Pacotes Personalizados"
}]
}
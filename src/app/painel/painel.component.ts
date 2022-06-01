import { Component, OnInit } from '@angular/core';
import { Frase } from '../shared/frase.model';
import { FRASES } from './frases-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.scss']
})
export class PainelComponent implements OnInit {

  public frases: Frase[] = FRASES
  public instrucao: string = 'Traduza a frase:'
  public resposta: string = ''

  public rodada: number = 0
  public rodadaFrase: Frase

  public progresso: number = 0

  public tentativas: number = 3

  constructor() {

    this.atualizaRodada()

   }

  ngOnInit(): void {

  }

  public atualizaResposta(resposta: Event): void{
      this.resposta = ((<HTMLInputElement>resposta.target).value)
      // console.log(this.resposta)
      
  }

  public verificarReposta(): void{

    if(this.rodadaFrase.frasePtBr === this.resposta){
      alert('A tradução está correta')
      //trocar pergunta da rodada
      this.rodada++
      //aumenta a barra do progresso
      this.progresso = this.progresso + (100 / this.frases.length)
      //a frase modifica de acordo com o click e o numero da rodada
      this.atualizaRodada()

 
      
    }else{
      //diminui a qtd de tentativas

      this.tentativas--

      if(this.tentativas < 0){
        alert("Você perdeu o jogo")
      }
      alert('A tradução está incorreta')
    }

  }

  public atualizaRodada(): void{
        //define a rodada da fase de acordo com a lógica
        this.rodadaFrase = this.frases[this.rodada]
         //limpar resposta
         this.resposta = ''
  }



}

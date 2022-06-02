import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Frase } from '../shared/frase.model';
import { FRASES } from './frases-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.scss']
})
export class PainelComponent implements OnInit, OnDestroy {

  public frases: Frase[] = FRASES
  public instrucao: string = 'Traduza a frase:'
  public resposta: string = ''

  public rodada: number = 0
  public rodadaFrase: Frase

  public progresso: number = 0

  public tentativas: number = 3

 @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter()

  constructor() {

    this.atualizaRodada()

   }

  ngOnInit(): void {

  }

  ngOnDestroy(){

  }

  public atualizaResposta(resposta: Event): void{
      this.resposta = ((<HTMLInputElement>resposta.target).value)
      
      
  }

  public verificarReposta(): void{

    if(this.rodadaFrase.frasePtBr === this.resposta){
      
      //trocar pergunta da rodada
      this.rodada++
      //aumenta a barra do progresso
      this.progresso = this.progresso + (100 / this.frases.length)
      //a frase modifica de acordo com o click e o numero da rodada

      if(this.rodada === 4){
        this.encerrarJogo.emit('Vitória')
      }
      this.atualizaRodada()

 
      
    }else{
      //diminui a qtd de tentativas

      this.tentativas--

      if(this.tentativas < 0){
        this.encerrarJogo.emit('Derrota')
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

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Carro } from '../../modelos/carro';
import { Acessorio } from '../../modelos/acessorio';

/**
 * Generated class for the EscolhaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-escolha',
  templateUrl: 'escolha.html',
})
export class EscolhaPage {

  public carro: Carro;
  public acessorios: Acessorio[];
  private _precoTotal: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {

      this.carro = this.navParams.get('carroSelecionado'); //pegando carro passado como parâmetro por outra página
      this._precoTotal = this.carro.preco;
      this.acessorios = [
        { nome: 'Freio ABS', preco: 800},
        { nome: 'Ar-condicionado', preco: 1000},
        { nome: 'Mp3 Player', preco: 500}
      ];
  }

  atualizaTotal(ativado: boolean, acessorio : Acessorio){
    ativado ? //if ternario
      this._precoTotal += acessorio.preco :
      this._precoTotal -= acessorio.preco;
  }

  get precoTotal(){
    return this._precoTotal;
  }

}

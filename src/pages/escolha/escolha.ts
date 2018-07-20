import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Carro } from '../../modelos/carro';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {

      this.carro = this.navParams.get('carroSelecionado'); //pegando carro passado como parâmetro por outra página
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EscolhaPage');
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Carro } from '../../modelos/carro';
import { AgendamentosServiceProvider } from '../../providers/agendamentos-service/agendamentos-service';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  public carro: Carro;
  public precoTotal: number;

  //form
  public nome: string = '';
  public endereco: string = '';
  public email: string = '';
  public data: string = new Date().toISOString();

  private _alerta : Alert;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _agendamentosService: AgendamentosServiceProvider, private _alertCtrl: AlertController) {
    this.carro = this.navParams.get('carroSelecionado');
    this.precoTotal = this.navParams.get('precoTotal');

  }

  agenda(){


    let agendamento = {
      nomeCliente: this.nome,
      enderecoCliente: this.endereco,
      emailCliente: this.email,
      modeloCarro: this.carro.nome,
      precoTotal: this.precoTotal
    };

    this.criaAlerta();


    this._agendamentosService.agenda(agendamento)
      .subscribe(
        () => this._alerta.setSubTitle('Agendamento realizado!').present(),
        () => this._alerta.setSubTitle('Falha no agendamento, tente novamente mais tarde! ').present()
      );
  }


  private criaAlerta() {
    this._alerta = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [{ 
        text: 'ok', 
        handler: () =>{
          this.navCtrl.setRoot(HomePage); //setRoot nao empilha porem direciona o usuario para a raiz do app nesse nao colocamos o .name
        }
      }]
    });
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Carro } from '../../modelos/carro';
import { AgendamentosServiceProvider } from '../../providers/agendamentos-service/agendamentos-service';
import { HomePage } from '../home/home';
import { Agendamento } from '../../modelos/agendamento';
import { AgendamentoDaoProvider } from '../../providers/agendamento-dao/agendamento-dao';

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

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private _agendamentosService: AgendamentosServiceProvider, 
    private _alertCtrl: AlertController,
    private _agendamentoDao: AgendamentoDaoProvider) { //banco

    this.carro = this.navParams.get('carroSelecionado');
    this.precoTotal = this.navParams.get('precoTotal');

  }

  agenda(){

    //validação dos dados
    if(!this.nome || !this.endereco || !this.email){

      this._alertCtrl.create({
        title: 'Preenchimento obrigatório',
        subTitle: 'Preencha todos os campos',
        buttons:[
          { text: 'ok'}
        ]
      }).present();

      return;
    }


    let agendamento : Agendamento = {
      nomeCliente: this.nome,
      enderecoCliente: this.endereco,
      emailCliente: this.email,
      modeloCarro: this.carro.nome,
      precoTotal: this.precoTotal,
      data: this.data,
      confirmado: false,
      enviado: false
    };

    this.criaAlerta();


    this._agendamentosService.agenda(agendamento)
      .mergeMap((valor) =>{ //juntando 2 observable o do servico da api com o observable que vem retornado do banco na funcao salva
        let observable = this._agendamentoDao.salva(agendamento); 
        if(valor instanceof Error){
          throw valor;
          
        }
        return observable;
        
      }) 
      .subscribe(
        (sucess) => this._alerta.setSubTitle('Agendamento realizado!').present(),
        (erro : Error) => this._alerta.setSubTitle(erro.message).present()
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

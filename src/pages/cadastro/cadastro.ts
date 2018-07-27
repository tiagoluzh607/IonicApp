import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Carro } from '../../modelos/carro';
import { AgendamentosServiceProvider } from '../../providers/agendamentos-service/agendamentos-service';
import { HomePage } from '../home/home';
import { Agendamento } from '../../modelos/agendamento';
import { AgendamentoDaoProvider } from '../../providers/agendamento-dao/agendamento-dao';
import { Vibration } from '@ionic-native/vibration'; //import apos instalar plugins cordova e ionic package

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
    private _agendamentoDao: AgendamentoDaoProvider, //banco 
    private _vibration : Vibration) { 

    this.carro = this.navParams.get('carroSelecionado');
    this.precoTotal = this.navParams.get('precoTotal');

  }

  agenda(){

    //validação dos dados
    if(!this.nome || !this.endereco || !this.email){

      //vibrando dispositivo
      this._vibration.vibrate(500);

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

    /* 
        mergeMap é o seguinte você trabalha nele com o retorno da funcao que você executou como parâmetro, e consegue retornar ainda outro observable
        para fazer oque quiser subscribe ou mergeMap novamente você escolhe, nao usamos o sucess pois o sucess nao tem retorno 
        somente o mergeMap tem retorno e obrigatoriamente de um observable.
    */
    this._agendamentoDao.ehDuplicado(agendamento)
      .mergeMap((retornoEhDuplicado) => {

        if(retornoEhDuplicado){ // se esta duplicado lanca um erro
          throw new Error('Erro registro duplicado');
        }

        return this._agendamentosService.agenda(agendamento); //senao já executa a chamada para api, que por sua vez retorna outro observable
      })
      .mergeMap((retornoAgenda) =>{ //juntando 2 observable o do servico da api com o observable que vem retornado do banco na funcao salva
        let observableSalva = this._agendamentoDao.salva(agendamento); 
        
        if(retornoAgenda instanceof Error){ //se estourar um erro em salva agendamento, estoura o erro aqui no principal
          throw retornoAgenda;   
        }
        return observableSalva; //se nao tiver erro retorna o observable
        
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

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AgendamentoDaoProvider } from '../../providers/agendamento-dao/agendamento-dao';
import { Agendamento } from '../../modelos/agendamento';
import { AgendamentosServiceProvider } from '../../providers/agendamentos-service/agendamentos-service';

@IonicPage()
@Component({
  selector: 'page-lista-agendamentos',
  templateUrl: 'lista-agendamentos.html',
})
export class ListaAgendamentosPage {

  agendamentos: Agendamento[] = [];
  private _alerta;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private _agendamentoDao: AgendamentoDaoProvider,
    private _alertCtrl: AlertController,
    private _agendamentosService: AgendamentosServiceProvider) {
  }

  ionViewDidLoad() {
    
    this._agendamentoDao.listaTodos()
      .subscribe(
        (agendamentos: Agendamento[])=>{ //caso operação der certo temos acesso a lista de agendamentos que estava dentro do observable passado como parâmetro
          this.agendamentos = agendamentos;
        },
        (erro: Error) => {console.log(erro.message)}
      );
  }

  reenvia(agendamento: Agendamento){

       
        this.criaAlerta();
    

        this._agendamentosService.agenda(agendamento)
          .mergeMap((retornoAgenda) =>{ //juntando 2 observable o do servico da api com o observable que vem retornado do banco na funcao salva
            let observableSalva = this._agendamentoDao.salva(agendamento); 
            
            if(retornoAgenda instanceof Error){ //se estourar um erro em salva agendamento, estoura o erro aqui no principal
              throw retornoAgenda;   
            }
            return observableSalva; //se nao tiver erro retorna o observable
            
          }) 
          .subscribe(
            (sucess) => this._alerta.setSubTitle('Agendamento Reenviado!').present(),
            (erro : Error) => this._alerta.setSubTitle(erro.message).present()
          );
  }

  private criaAlerta() {
    this._alerta = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [{ 
        text: 'ok'
      }]
    });
  }

}

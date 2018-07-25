import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AgendamentoDaoProvider } from '../../providers/agendamento-dao/agendamento-dao';
import { Agendamento } from '../../modelos/agendamento';

@IonicPage()
@Component({
  selector: 'page-lista-agendamentos',
  templateUrl: 'lista-agendamentos.html',
})
export class ListaAgendamentosPage {

  agendamentos: Agendamento[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private _agendamentoDao: AgendamentoDaoProvider) {
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

}

import { Injectable } from '@angular/core';
import { Agendamento } from '../../modelos/agendamento';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AgendamentoDaoProvider {

  constructor(private _storage: Storage) {
    
  }

  private _geraChave(agendamento: Agendamento){
    let chave = agendamento.emailCliente + agendamento.data.substr(0, 10); //criando uma chave, para recuperar o objeto depois com um get
    return chave;
  }


  salva(agendamento : Agendamento){

    
    let chave = this._geraChave(agendamento);
    let promisse = this._storage.set(chave, agendamento); //retorna uma promisse
    return Observable.fromPromise(promisse); //converte para observable e retorna um observable
  }
}

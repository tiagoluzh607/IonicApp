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

  ehDuplicado(agendamento: Agendamento){
    let chave = this._geraChave(agendamento);

    //Método get retorna uma promisse por isso vamos converter para um observable

    let promisse = this._storage.get(chave).then(dado => dado ? true : false);//se o dado existir retona true, senao retorna false
    return Observable.fromPromise(promisse); //retorna um observable com valendo true ou false
       
  }

  listaTodos(){
    let agendamentos: Agendamento[] = [];

    let promisse = this._storage.forEach((agendamento: Agendamento) => {
      agendamentos.push(agendamento);
    }).then(()=> agendamentos); //retorna a lista de agendamentos, dentro da promisse

    return Observable.fromPromise(promisse); //retorna uma observable, com a lista dentro dele (pois converteu a promisse)
  }
}

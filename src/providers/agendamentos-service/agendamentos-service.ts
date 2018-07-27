import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Agendamento } from '../../modelos/agendamento';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AgendamentosServiceProvider {

  private _url : string = 'http://192.168.15.3:8080/api';

  constructor(private _http: HttpClient) {
    
  }

  agenda(agendamento : Agendamento){
    return this._http.post(this._url+'/agendamento/agenda', agendamento) //retorna um observable
    .do(() => agendamento.enviado = true)
    .catch((erro) => Observable.of(new Error('Falha no Agendamento!'))); //retorna um novo observable com um erro
  }

}

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Agendamento } from '../../modelos/agendamento';

@Injectable()
export class AgendamentosServiceProvider {

  private _url : string = 'http://localhost:8080/api';

  constructor(private _http: HttpClient) {
    
  }

  agenda(agendamento : Agendamento){
    return this._http.post(this._url+'/agendamento/agenda', agendamento) //retorna um observable
    .do(() => agendamento.enviado = true);
  }

}

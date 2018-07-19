import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Carro } from "../../modelos/carro";

@Injectable()
export class CarrosServiceProvider {

  private _http : HttpClient;

  constructor(private _htt: HttpClient) {
    this._http = _htt;
  }

  lista(){

    return this._http.get<Carro[]>('http://localhost:8080/api/carro/listaTodos')

  }

}

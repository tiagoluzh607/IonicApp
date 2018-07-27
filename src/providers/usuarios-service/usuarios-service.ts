import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../modelos/usuario';

/*
  Generated class for the UsuariosServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuariosServiceProvider {

  private _usuarioLogado: Usuario;

  constructor(private _http: HttpClient) {
    
  }

  efetuaLogin(email : string, senha: string){
    return this._http.post<Usuario>('http://192.168.15.3:8080/api/login', {email, senha})
                      .do((usuario: Usuario) => this._usuarioLogado = usuario);

  }

  obtemUsuatioLogado(){
    return this._usuarioLogado;
  }

}

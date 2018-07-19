import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Carro } from "../../modelos/carro";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public carros: Carro[];

  constructor(public navCtrl: NavController, private _http: HttpClient, private _loadingCtrl: LoadingController, private _alertCtrl : AlertController) {
    
    let loading = this._loadingCtrl.create({content: 'Carregandos carros...'}); //faz um componente de carregamento
    loading.present(); // starta o componente de carregamento

    this._http.get<Carro[]>('http://localhost:8080/api/carro/listaTodosx')
      .subscribe(
            (carros) =>{

                this.carros = carros;
                loading.dismiss(); //desativar o componente loading quando terminamos de carregar
            },
            (err: HttpErrorResponse)=>{

                console.log(err);
                loading.dismiss();

                this._alertCtrl.create({
                    title: 'Falha na conexão', 
                    subTitle: 'Não foi possível carregar a lista de carros Tente Novamente mais tarde',
                    buttons: [{text: 'Ok'}]
                }).present();

            }
        );

  }

}

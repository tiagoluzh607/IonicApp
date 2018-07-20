import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Carro } from "../../modelos/carro";
import { HttpErrorResponse } from "@angular/common/http";
import { CarrosServiceProvider } from "../../providers/carros-service/carros-service";
import { NavLifecycles } from '../../utils/ionic/nav/nav-lifecycles';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements NavLifecycles {

  public carros: Carro[];

  constructor(
      public navCtrl: NavController,
      private _loadingCtrl: LoadingController, 
      private _alertCtrl : AlertController, 
      private _carrosService: CarrosServiceProvider
  ){ }

      ionViewDidLoad(){

        let loading = this._loadingCtrl.create({content: 'Carregandos carros...'}); //faz um componente de carregamento
        loading.present(); // starta o componente de carregamento
    
        this._carrosService.lista()
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



      selecionaCarro(carro: Carro){
          console.log(carro);
      }

}

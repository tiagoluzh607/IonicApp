import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { Usuario } from '../../modelos/usuario';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string = 'joao@alura.com.br';
  senha: string = 'alura123';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _usuariosService: UsuariosServiceProvider,
    private _alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  efetuaLogin(){
    console.log(this.email);
    console.log(this.senha);

    this._usuariosService.efetuaLogin(this.email, this.senha)
      .subscribe(
        (usuario : Usuario)=>{
          console.log(usuario);
          this.navCtrl.setRoot(HomePage);
        },
        (erro)=>{
          this._alertCtrl.create({
            title: 'Falha no login',
            subTitle: 'Email ou senha incorretos! Verifique ai!',
            buttons: [{text: 'Ok'}]
          }).present()
        }
      );

    
  }

}

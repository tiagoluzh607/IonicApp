import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, normalizeURL } from 'ionic-angular';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { Camera } from '@ionic-native/camera';



@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public _usuariosService: UsuariosServiceProvider,
    private _camera: Camera) {
  }

  tiraFoto(){

    this._camera.getPicture({
      destinationType: this._camera.DestinationType.FILE_URI,
      saveToPhotoAlbum: true,
      correctOrientation: true
    })
    .then(fotoUri => {
      fotoUri = normalizeURL(fotoUri); //normalizando a Url para qualquer dispositivo
      this._usuariosService.salvaAvatar(fotoUri);
    })
    .catch(erro => console.log(erro));

  }

  get avatar(){
    return this._usuariosService.obtemAvatar();
  }

  get usuarioLogado(){
    return this._usuariosService.obtemUsuatioLogado();
  }
}

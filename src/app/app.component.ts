import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ListaAgendamentosPage } from '../pages/lista-agendamentos/lista-agendamentos';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from '../pages/perfil/perfil';
import { UsuariosServiceProvider } from '../providers/usuarios-service/usuarios-service';
@Component({
  selector: 'myapp',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) public nav: Nav; //capturando o componente de navegação da view
  rootPage:any = LoginPage;

  public paginas = [
    {titulo: 'Agendamentos', componente: ListaAgendamentosPage.name, icone:'calendar'},
    {titulo: 'Perfil', componente: PerfilPage.name, icone:'person'}
  ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private _usuariosService: UsuariosServiceProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  irParaPagina(componente){
    this.nav.push(componente); //utilizando o componente de navegação para navegar para a pagina
  }

  get avatar(){
    return this._usuariosService.obtemAvatar();
  }

  get usuarioLogado(){
    return this._usuariosService.obtemUsuatioLogado();
  }
}


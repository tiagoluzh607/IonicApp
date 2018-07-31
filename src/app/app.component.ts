import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ListaAgendamentosPage } from '../pages/lista-agendamentos/lista-agendamentos';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from '../pages/perfil/perfil';
import { UsuariosServiceProvider } from '../providers/usuarios-service/usuarios-service';
import { OneSignal, OSNotification } from '@ionic-native/onesignal';
import { AgendamentoDaoProvider } from '../providers/agendamento-dao/agendamento-dao';
import { Agendamento } from '../modelos/agendamento';
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

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private _usuariosService: UsuariosServiceProvider, 
    private _onesignal: OneSignal,
    private _agendamentoDao: AgendamentoDaoProvider) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      //Configurar o OnSignal ao Iniciar o App
      let iosConfigs = {
        kOSSettingsKeyAutoPrompt: true, //pode abrir um poupup perguntando ao usuario final se ele habilita o recebimento de notificações?
        kOSSettingsKeyInAppLaunchURL: false //quero abrir uma navegação interna ao clicar na notificacao?
      }


      let idOnesignal : string = '1a0338ec-543f-44d5-b712-7a41a05ccf76' //id obtida no Onesignal/ configurações / em chaves e Ids, campo "Id do aplicativo onesignal" 
      let numeroDoProjetoNoGoogle : string = '886839109159' //obtido no firebase/ fazendo um projeto / Settings/ Cloud Messaging campo "Sender Id"

      this._onesignal
        .startInit(idOnesignal, numeroDoProjetoNoGoogle)
        .iOSSettings(iosConfigs);

      //Exibindo notificação mesmo que a tela do app esteja aberta
      this._onesignal.inFocusDisplaying(
        this._onesignal.OSInFocusDisplayOption.Notification
      );

      //Executando uma função quando a notificação chegar, no nosso exemplo aluracar para confirmar o agendamento feito pelo servidor
      this._onesignal.handleNotificationReceived()
        .subscribe(
          (notificacao : OSNotification)=>{
            let dadosAdicionais = notificacao.payload
                                              .additionalData //pegando uma informação adicional que foi passada na notificação
            let agendamentoId = dadosAdicionais['agendamento-id']; //pegando o agendamento-id que virá num array
            this._agendamentoDao.recupera(agendamentoId)
              .subscribe(
                (agendamento: Agendamento) => {
                  agendamento.confirmado = true; //faz a confirmação do agendamento do test drive
                  this._agendamentoDao.salva(agendamento); //salva 
                }
              )
          }
        );

      this._onesignal.endInit(); //quer dizer que acabou a conf do onesignal

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


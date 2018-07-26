import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpClientModule } from "@angular/common/http";
import { CarrosServiceProvider } from '../providers/carros-service/carros-service';
import { AgendamentosServiceProvider } from '../providers/agendamentos-service/agendamentos-service';
import { IonicStorageModule } from '@ionic/storage' //para persistência

import 'rxjs/add/operator/do'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/observable/of'
import { AgendamentoDaoProvider } from '../providers/agendamento-dao/agendamento-dao';
import { LoginPage } from '../pages/login/login';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot({ //para persistênci:a
      name: 'aluracar', //nome do banco
      storeName: 'agendamentos', //nome da tabela
      driverOrder: ['indexeddb'] //qual ambiente de persistencia irei usar sqlite? indexedbd?
    }) 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CarrosServiceProvider,
    AgendamentosServiceProvider,
    AgendamentoDaoProvider
  ]
})
export class AppModule {}

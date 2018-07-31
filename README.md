## Projeto Roda Com as Seguintes Configuraçes


cli packages: (/usr/local/lib/node_modules)

    @ionic/cli-utils  : 1.16.0
    ionic (Ionic CLI) : 3.16.0

global packages:

    cordova (Cordova CLI) : 7.0.1 

local packages:

    @ionic/app-scripts : 3.0.1
    Cordova Platforms  : android 6.2.3
    Ionic Framework    : ionic-angular 3.8.0

System:

    Android SDK Tools : 26.1.1
    Node              : v10.4.1
    npm               : 6.1.0 
    OS                : Linux 4.9



## Para startar o projeto entrar na pasta 

1 entrar na pasta "aluracar/aluracar-webservice" e rodar o servidor com o comando 

    npm start

2 entrar na pasta "aluracar" e rodar o servidor com o comando (obs: funciona só ate o commit "Implementacao de Plugin - DatePicker - Escolher data-picker nativa") depois desse commit somente fazendo build nativo

    ionic serve --lab

3 Para fazer build nativo

    ionic cordova platform add android       //esse comando vai criar na pasta platfoms do projeto a estrutura para android
    ionic cordova build android    //esse comando ira gerar um apk em /platforms/android/build/

se quiser rodar direto no dispositivo é só conectar via usb com a opção do desenvolvedor ativada no dispositivo e rodar o comando

    ionic cordova run android      //ele pesquisa algum dispositivo conectado e instala e roda o apk nele




This is a starter template for [Ionic](http://ionicframework.com/docs/) projects.

## How to use this template

*This template does not work on its own*. The shared files for each starter are found in the [ionic2-app-base repo](https://github.com/ionic-team/ionic2-app-base).

To use this template, either create a new ionic project using the ionic node.js utility, or copy the files from this repository into the [Starter App Base](https://github.com/ionic-team/ionic2-app-base).

### With the Ionic CLI:

Take the name after `ionic2-starter-`, and that is the name of the template to be used when using the `ionic start` command below:

```bash
$ sudo npm install -g ionic cordova
$ ionic start myBlank blank
```

Then, to run it, cd into `myBlank` and run:

```bash
$ ionic cordova platform add ios
$ ionic cordova run ios
```

Substitute ios for android if not on a Mac.


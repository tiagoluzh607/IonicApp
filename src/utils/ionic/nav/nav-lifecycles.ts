export interface NavLifecycles{
    /**
     * Executa ao terminar ao carregamentoda pagina
    */
    ionViewDidLoad?(): void;

    /**
     * É acionado ao entrar em uma página antes de se tornar a ativa . 
     * Use-o para tarefas que você deseja fazer toda vez que entrar na visualização 
     * (definindo ouvintes de eventos, atualizando uma tabela, etc.).
     */
    ionViewWillEnter?(): void;

    /**
     * Disparado ao entrar em uma página, depois que ela se torna a página ativa . Bastante semelhante ao anterior.
     */
    ionViewDidEnter?(): void;

    /**
     * Disparado quando você sai de uma página antes de deixar de ser a ativa . 
     * Use-o para coisas que você precisa executar toda vez que estiver saindo de uma página 
     * (desative os ouvintes de eventos, etc.).
     */
    ionViewWillLeave?(): void;

    /**
     *  Disparado quando você sai de uma página, depois que ela deixa de ser a ativa . Semelhante ao anterior.
     */
    ionViewDidLeave?(): void;

    /**
     * Disparado quando uma exibição será completamente removida (depois de deixar uma exibição não armazenada em cache).
     */
    ionViewWillUnload?(): void;

    /*-------------------- Eventos de Guarda ---------------------------------*/

    /**
     * Disparado antes de entrar em uma visão, permite que você controle se a visão pode ser acessada ou não (retornando verdadeiro ou falso ).
     */
    ionViewCanEnter?(): boolean;

    /**
     * Disparado antes de deixar uma visão, permite controlar se a visão pode ser deixada ou não. (retornando verdadeiro ou falso ).
     */
    ionViewCanLeave?(): boolean;

}
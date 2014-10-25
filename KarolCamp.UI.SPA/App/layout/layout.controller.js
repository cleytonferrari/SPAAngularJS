(function () {
    'use strict';

    angular.module('MyApp').controller('LayoutController', LayoutController);

    LayoutController.$inject = ['$rootScope', '$location', 'Autenticacao', 'APP_CONFIG'];

    function LayoutController($rootScope, $location, Autenticacao, APP_CONFIG) {
        $rootScope.versao = APP_CONFIG.Versao;
        $rootScope.appName = APP_CONFIG.AppNome;
        $rootScope.tituloPagina = '';
        $rootScope.user = new UsuarioLogado().getUsuario;

        $rootScope.logout = function () {
            Autenticacao.logout(function () {
                $location.path('/Login');
            });
        };
    };

})();
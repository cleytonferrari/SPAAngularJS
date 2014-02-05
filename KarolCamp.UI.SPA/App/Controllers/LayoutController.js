myApp.controller('LayoutController', ['$rootScope', '$location', 'Autenticacao', function ($rootScope, $location, Autenticacao) {
    $rootScope.tituloPagina = '';
    $rootScope.user = new UsuarioLogado().getUsuario;

    $rootScope.logout = function () {
        Autenticacao.logout(function () {
            $location.path('/Login');
        });
    };
}]);
(function () {
    'use strict';

    angular.module('MyApp').controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$location', 'Autenticacao'];

    function LoginController($scope, $location, Autenticacao) {
        $scope.titulo = 'Login';
        $scope.credenciais = { Login: '', Senha: '' };

        $scope.login = function () {

            Autenticacao.login($scope.credenciais,
                function (res) {
                    $location.path('/Painel');
                },
                function (err) {
                    $scope.error = "Usuário/Senha informado não são validos";
                });
        };
    };

})();
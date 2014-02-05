myApp.controller('LoginController', ['$scope', '$location', 'Autenticacao', function ($scope, $location, Autenticacao) {
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

}]);
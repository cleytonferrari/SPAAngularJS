myApp.controller('TrilhaCadastrarController', ['$scope', '$routeParams', '$location', 'Api',
    function ($scope, $routeParams, $location, api) {

        if ($routeParams.Id != undefined) {
            $scope.trilha = api.Trilha.get({ Id: $routeParams.Id });
        } else {
            $scope.trilha = {};
        }

        $scope.cadastrar = function () {
            if ($scope.trilhaForm.$valid) {
                if ($scope.trilha.Id != undefined) {
                    $scope.trilha.$update({ Id: $scope.trilha.Id }, function () {
                        $location.path('/Trilha');
                    });
                } else {
                    api.Trilha.save({}, $scope.trilha, function () {
                        $location.path('/Trilha');
                    });
                }
            }
        };

    }]);
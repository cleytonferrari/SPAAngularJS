myApp.controller('PalestranteCadastrarController', ['$scope', '$routeParams', '$location', 'Api',
    function ($scope, $routeParams, $location, api) {

        if ($routeParams.Id != undefined) {
            $scope.palestrante = api.Palestrante.get({ Id: $routeParams.Id });
        } else {
            $scope.palestrante = {};
        }

        $scope.cadastrar = function () {
            if ($scope.palestranteForm.$valid) {
                if ($scope.palestrante.Id != undefined) {
                    $scope.palestrante.$update({ Id: $scope.palestrante.Id }, function () {
                        $location.path('/Palestrante');
                    });
                } else {
                    api.Palestrante.save({}, $scope.palestrante, function () {
                        $location.path('/Palestrante');
                    });
                }
            }
        };

    }]);
myApp.controller('SalaCadastrarController', ['$scope', '$routeParams', '$location', 'Api',
    function ($scope, $routeParams, $location, api) {

        if ($routeParams.Id != undefined) {
            $scope.sala = api.Sala.get({ Id: $routeParams.Id });
        } else {
            $scope.sala = {};
        }

        $scope.cadastrar = function () {
            if ($scope.salaForm.$valid) {
                if ($scope.sala.Id != undefined) {
                    $scope.sala.$update({ Id: $scope.sala.Id }, function () {
                        $location.path('/Sala');
                    });
                } else {
                    api.Sala.save({}, $scope.sala, function () {
                        $location.path('/Sala');
                    });
                }
            }
        };

    }]);
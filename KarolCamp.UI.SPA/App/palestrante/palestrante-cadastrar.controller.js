(function () {
    'use strict';

    angular.module('MyApp').controller('PalestranteCadastrarController', PalestranteCadastrarController);

    PalestranteCadastrarController.$inject = ['$scope', '$routeParams', '$location', 'PalestranteFactory'];

    function PalestranteCadastrarController($scope, $routeParams, $location, PalestranteFactory) {
        if ($routeParams.Id != undefined) {
            $scope.palestrante = PalestranteFactory.get({ Id: $routeParams.Id });
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
                    PalestranteFactory.save({}, $scope.palestrante, function () {
                        $location.path('/Palestrante');
                    });
                }
            }
        };
    };

})();
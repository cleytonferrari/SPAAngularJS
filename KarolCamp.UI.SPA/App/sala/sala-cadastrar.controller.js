(function () {
    'use strict';

    angular.module('MyApp').controller('SalaCadastrarController', SalaCadastrarController);

    SalaCadastrarController.$inject = ['$scope', '$routeParams', '$location', 'Sala'];

    function SalaCadastrarController($scope, $routeParams, $location, Sala) {
        if ($routeParams.Id != undefined) {
            $scope.sala = Sala.get({ Id: $routeParams.Id });
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
                    Sala.save({}, $scope.sala, function () {
                        $location.path('/Sala');
                    });
                }
            }
        };
    };

})();
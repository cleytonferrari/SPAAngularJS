(function () {
    'use strict';

    angular.module('MyApp').controller('SalaCadastrarController', SalaCadastrarController);

    SalaCadastrarController.$inject = ['$scope', '$routeParams', '$location', 'SalaFactory'];

    function SalaCadastrarController($scope, $routeParams, $location, SalaFactory) {
        if ($routeParams.Id != undefined) {
            $scope.sala = SalaFactory.get({ Id: $routeParams.Id });
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
                    SalaFactory.save({}, $scope.sala, function () {
                        $location.path('/Sala');
                    });
                }
            }
        };
    };

})();
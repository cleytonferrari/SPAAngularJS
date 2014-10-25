(function () {
    'use strict';

    angular.module('MyApp').controller('TrilhaCadastrarController', TrilhaCadastrarController);

    TrilhaCadastrarController.$inject = ['$scope', '$routeParams', '$location', 'TrilhaFactory'];

    function TrilhaCadastrarController($scope, $routeParams, $location, TrilhaFactory) {
        if ($routeParams.Id != undefined) {
            $scope.trilha = TrilhaFactory.get({ Id: $routeParams.Id });
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
                    TrilhaFactory.save({}, $scope.trilha, function () {
                        $location.path('/Trilha');
                    });
                }
            }
        };
    };

})();
(function () {
    'use strict';

    angular.module('MyApp').controller('SalaExcluirController', SalaExcluirController);

    SalaExcluirController.$inject = ['$scope', '$location', '$routeParams', 'Sala'];

    function SalaExcluirController($scope, $location, $routeParams, Sala) {
        var init = function () {
            $scope.Sala = Sala.get({ Id: $routeParams.Id });
        };

        $scope.excluir = function () {
            $scope.Sala.$delete({ Id: $scope.Sala.Id }, function () {
                $location.path('/Sala');
            });
        };

        init();
    };

})();
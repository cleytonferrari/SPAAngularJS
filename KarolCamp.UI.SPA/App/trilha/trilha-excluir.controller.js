(function () {
    'use strict';

    angular.module('MyApp').controller('TrilhaExcluirController', TrilhaExcluirController);

    TrilhaExcluirController.$inject = ['$scope', '$location', '$routeParams', 'TrilhaFactory'];

    function TrilhaExcluirController($scope, $location, $routeParams, TrilhaFactory) {
        var init = function () {
            $scope.Trilha = TrilhaFactory.get({ Id: $routeParams.Id });
        };

        $scope.excluir = function () {
            $scope.Trilha.$delete({ Id: $scope.Trilha.Id }, function () {
                $location.path('/Trilha');
            });
        };

        init();
    };

})();
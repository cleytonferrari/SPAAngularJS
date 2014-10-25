(function () {
    'use strict';

    angular.module('MyApp').controller('TrilhaDetalheController', TrilhaDetalheController);

    TrilhaDetalheController.$inject = ['$scope', '$routeParams', 'TrilhaFactory'];

    function TrilhaDetalheController($scope, $routeParams, TrilhaFactory) {
        var init = function () {
            $scope.Trilha = TrilhaFactory.get({ Id: $routeParams.Id });
        };

        init();
    };

})();
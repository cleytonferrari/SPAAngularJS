(function () {
    'use strict';

    angular.module('MyApp').controller('SalaDetalheController', SalaDetalheController);

    SalaDetalheController.$inject = ['$scope', '$routeParams', 'salasGetById'];

    function SalaDetalheController($scope, $routeParams, salasGetById) {
        var init = function () {
            $scope.Sala = salasGetById;
        };

        init();
    };

})();
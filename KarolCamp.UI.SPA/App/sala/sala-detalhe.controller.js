(function () {
    'use strict';

    angular.module('MyApp').controller('SalaDetalheController', SalaDetalheController);

    SalaDetalheController.$inject = ['$scope', '$routeParams', 'Sala'];

    function SalaDetalheController($scope, $routeParams, Sala) {
        var init = function () {
            $scope.Sala = Sala.get({ Id: $routeParams.Id });
        };

        init();
    };

})();
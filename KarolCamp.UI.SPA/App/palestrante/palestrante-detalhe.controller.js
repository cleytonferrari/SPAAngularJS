(function () {
    'use strict';

    angular.module('MyApp').controller('PalestranteDetalheController', PalestranteDetalheController);

    PalestranteDetalheController.$inject = ['$scope', '$routeParams', 'PalestranteFactory'];

    function PalestranteDetalheController($scope, $routeParams, PalestranteFactory) {
        var init = function () {
            $scope.Palestrante = PalestranteFactory.get({ Id: $routeParams.Id });
        };

        init();
    };

})();
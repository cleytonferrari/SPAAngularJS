(function () {
    'use strict';

    angular.module('MyApp').controller('PalestranteController', PalestranteController);

    PalestranteController.$inject = ['$scope', '$rootScope', 'PalestranteFactory'];

    function PalestranteController($scope, $rootScope, PalestranteFactory) {
        $rootScope.tituloPagina = '- Palestrantes';
        var init = function () {
            $scope.Palestrantes = PalestranteFactory.query();
        };

        init();
    };

})();
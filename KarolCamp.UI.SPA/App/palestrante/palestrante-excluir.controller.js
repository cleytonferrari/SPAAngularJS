(function () {
    'use strict';

    angular.module('MyApp').controller('PalestranteExcluirController', PalestranteExcluirController);

    PalestranteExcluirController.$inject = ['$scope', '$location', '$routeParams', 'PalestranteFactory'];

    function PalestranteExcluirController($scope, $location, $routeParams, PalestranteFactory) {
        var init = function () {
            $scope.Palestrante = PalestranteFactory.get({ Id: $routeParams.Id });
        };

        $scope.excluir = function () {
            $scope.Palestrante.$delete({ Id: $scope.Palestrante.Id }, function () {
                $location.path('/Palestrante');
            });
        };

        init();
    };

})();
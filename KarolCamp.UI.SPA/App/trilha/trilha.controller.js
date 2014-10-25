(function () {
    'use strict';

    angular.module('MyApp').controller('TrilhaController', TrilhaController);

    TrilhaController.$inject = ['$scope', '$rootScope', 'TrilhaFactory'];

    function TrilhaController($scope, $rootScope, TrilhaFactory) {
        $rootScope.tituloPagina = '- Trilhas';
        var init = function () {
            $scope.Trilhas = TrilhaFactory.query();
        };

        init();
    };

})();
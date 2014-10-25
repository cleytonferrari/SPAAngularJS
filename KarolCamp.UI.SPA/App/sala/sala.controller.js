(function () {
    'use strict';

    angular.module('MyApp').controller('SalaController', SalaController);

    SalaController.$inject = ['$scope', '$rootScope', 'salasGetAll'];

    function SalaController($scope, $rootScope, salasGetAll) {

        $rootScope.tituloPagina = '- Salas';

        var init = function () {
            $scope.Salas = salasGetAll;
        };

        init();
    }
    
})();
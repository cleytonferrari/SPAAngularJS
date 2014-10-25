(function () {
    'use strict';

    angular.module('MyApp').controller('PainelController', PainelController);

    PainelController.$inject = ['$scope'];

    function PainelController($scope) {
        var usuarioLogado = JSON.parse(sessionStorage.getItem("usuario"));
    };
    
})();
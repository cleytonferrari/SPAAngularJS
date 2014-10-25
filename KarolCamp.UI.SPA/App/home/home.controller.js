(function () {
    'use strict';

    angular.module('MyApp').controller('HomeController', HomeController);

    HomeController.$inject = ['$scope'];

    function HomeController($scope) {
        $scope.titulo = 'Página Inicial';
    };

})();
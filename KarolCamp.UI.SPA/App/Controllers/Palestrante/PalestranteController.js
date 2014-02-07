myApp.controller('PalestranteController', ['$scope', '$rootScope','Api', function ($scope, $rootScope, api) {
    $rootScope.tituloPagina = '- Salas';
    var init = function () {
        $scope.Palestrantes = api.Palestrante.query();
    };

    init();
    
}]);
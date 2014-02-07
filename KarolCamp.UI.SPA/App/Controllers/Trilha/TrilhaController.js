myApp.controller('TrilhaController', ['$scope', '$rootScope','Api', function ($scope, $rootScope, api) {
    $rootScope.tituloPagina = '- Salas';
    var init = function () {
        $scope.Trilhas = api.Trilha.query();
    };

    init();
    
}]);
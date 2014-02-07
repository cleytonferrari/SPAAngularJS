myApp.controller('SalaController', ['$scope', '$rootScope','Api', function ($scope, $rootScope, api) {
    $rootScope.tituloPagina = '- Salas';
    var init = function () {
        $scope.Salas = api.Sala.query();
    };

    init();
    
}]);
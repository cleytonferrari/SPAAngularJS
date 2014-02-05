myApp.controller('SalaController', ['$scope', '$rootScope','Sala', function ($scope, $rootScope, Sala) {
    $rootScope.tituloPagina = '- Salas';
    var init = function () {
        $scope.Salas = Sala.query();
    };

    init();
    
}]);
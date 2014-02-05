myApp.controller('SalaDetalheController', ['$scope', '$routeParams', 'Sala', function ($scope, $routeParams, Sala) {
    
    var init = function () {
        $scope.Sala = Sala.get({ Id: $routeParams.Id });
    };

    init();
 
}]);
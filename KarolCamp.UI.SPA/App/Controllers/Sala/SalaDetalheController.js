myApp.controller('SalaDetalheController', ['$scope', '$routeParams', 'Api', function ($scope, $routeParams, api) {
    
    var init = function () {
        $scope.Sala = api.Sala.get({ Id: $routeParams.Id });
    };

    init();
 
}]);
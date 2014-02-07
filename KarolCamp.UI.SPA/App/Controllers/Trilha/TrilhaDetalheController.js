myApp.controller('TrilhaDetalheController', ['$scope', '$routeParams', 'Api', function ($scope, $routeParams, api) {
    
    var init = function () {
        $scope.Trilha = api.Trilha.get({ Id: $routeParams.Id });
    };

    init();
 
}]);
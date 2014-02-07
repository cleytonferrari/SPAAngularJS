myApp.controller('PalestranteDetalheController', ['$scope', '$routeParams', 'Api', function ($scope, $routeParams, api) {
    
    var init = function () {
        $scope.Palestrante = api.Palestrante.get({ Id: $routeParams.Id });
    };

    init();
 
}]);
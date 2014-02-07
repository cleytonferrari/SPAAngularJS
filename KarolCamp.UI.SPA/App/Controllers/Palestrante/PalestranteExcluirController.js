myApp.controller('PalestranteExcluirController', ['$scope', '$location', '$routeParams', 'Api',
    function ($scope, $location, $routeParams, api) {
    
    var init = function () {
        $scope.Palestrante = api.Palestrante.get({ Id: $routeParams.Id });
    };

    $scope.excluir = function () {  
        $scope.Palestrante.$delete({ Id: $scope.Palestrante.Id }, function () {
            $location.path('/Palestrante');
        });
    };

    init();
}]);
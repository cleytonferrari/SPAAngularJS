myApp.controller('SalaExcluirController', ['$scope', '$location', '$routeParams', 'Api',
    function ($scope, $location, $routeParams, api) {
    
    var init = function () {
        $scope.Sala = api.Sala.get({ Id: $routeParams.Id });
    };

    $scope.excluir = function () {  
        $scope.Sala.$delete({ Id: $scope.Sala.Id }, function () {
            $location.path('/Sala');
        });
    };

    init();
}]);
myApp.controller('TrilhaExcluirController', ['$scope', '$location', '$routeParams', 'Api',
    function ($scope, $location, $routeParams, api) {
    
    var init = function () {
        $scope.Trilha = api.Trilha.get({ Id: $routeParams.Id });
    };

    $scope.excluir = function () {  
        $scope.Trilha.$delete({ Id: $scope.Trilha.Id }, function () {
            $location.path('/Trilha');
        });
    };

    init();
}]);
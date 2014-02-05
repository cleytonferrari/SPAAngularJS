var myApp = angular.module('MyApp', ['ngRoute', 'ngResource', 'ngCookies']);

myApp.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'App/Views/Home/index.html',
            controller: 'HomeController',
            access: 'publico'
        })
        .when('/Login', {
            templateUrl: 'App/Views/Login/index.html',
            controller: 'LoginController',
            access: 'publico'
        })
        .when('/Painel', {
            templateUrl: 'App/Views/Painel/index.html',
            controller: 'PainelController',
            access: 'logado'
        })
        .when('/Sala', {
            templateUrl: 'App/Views/Sala/index.html',
            controller: 'SalaController',
            access: 'logado'
        })
        .when('/Sala/Cadastrar', {
            templateUrl: 'App/Views/Sala/cadastrar.html',
            controller: 'SalaCadastrarController',
            access: 'logado'
        })
        .when('/Sala/:Id/Excluir', {
            templateUrl: 'App/Views/Sala/excluir.html',
            controller: 'SalaExcluirController',
            access: 'logado'
        })
        .when('/Sala/:Id/Cadastrar', {
            templateUrl: 'App/Views/Sala/cadastrar.html',
            controller: 'SalaCadastrarController',
            access: 'logado'
        })
        .when('/Sala/:Id', {
            templateUrl: 'App/Views/Sala/detalhe.html',
            controller: 'SalaDetalheController',
            access: 'suporte'
        });

    $httpProvider.interceptors.push(function ($q, $location) {
        return {
            'responseError': function (response) {
                if (response.status === 401 || response.status === 403) {
                    $location.path('/Login');
                    return $q.reject(response);
                } else {
                    return $q.reject(response);
                }
            }
        };
    });
    
}]).run(['$rootScope', '$location', '$http', 'Autenticacao', function ($rootScope, $location, $http, Autenticacao) {

    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        $rootScope.error = null;
        if (!Autenticacao.authorize(next.access)) {
            if (Autenticacao.isLoggedIn()) {
                //nao mostra porque ao redirecionar para o painel entra aqui denovo e limpa
                //usar o toastr
                $rootScope.error = "Você não tem permissão para acessar esta area";
                $location.path('/Painel');
            } else $location.path('/Login');
        }
    });

}]);
(function () {
    'use strict';

    angular.module('MyApp').config(config);

    config.$inject = ['$routeProvider', '$httpProvider'];

    function config($routeProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'App/home/home.html',
                controller: 'HomeController',
                access: 'publico'
            })
            .when('/Login', {
                templateUrl: 'App/login/login.html',
                controller: 'LoginController',
                access: 'publico'
            })
            .when('/Painel', {
                templateUrl: 'App/painel/painel.html',
                controller: 'PainelController',
                access: 'logado'
            })
            .when('/Sala', {
                templateUrl: 'App/sala/sala.html',
                controller: 'SalaController',
                access: 'logado',
                resolve: {
                    salasGetAll: function ($q, $route, $timeout, salaFactory) {
                        var deferred = $q.defer();

                        var sucessoCallBack = function (result) {
                            if (angular.equals(result, [])) {
                                deferred.reject("Sala não encontrada");
                            } else {
                                deferred.resolve(result);
                            }
                        };
                        //Timeout para mostrar o carregamento, totalmente desnecessario
                        $timeout(function () {
                            salaFactory.getAll(sucessoCallBack);
                        }, 1000);

                        return deferred.promise;
                    }
                },
            })
            .when('/Sala/Cadastrar', {
                templateUrl: 'App/sala/sala-cadastrar.html',
                controller: 'SalaCadastrarController',
                access: 'logado'
            })
            .when('/Sala/:Id/Excluir', {
                templateUrl: 'App/sala/sala-excluir.html',
                controller: 'SalaExcluirController',
                access: 'logado'
            })
            .when('/Sala/:Id/Cadastrar', {
                templateUrl: 'App/sala/sala-cadastrar.html',
                controller: 'SalaCadastrarController',
                access: 'logado'
            })
            .when('/Sala/:Id', {
                templateUrl: 'App/sala/sala-detalhe.html',
                controller: 'SalaDetalheController',
                access: 'logado'
            })
            .when('/Trilha', {
                templateUrl: 'App/trilha/trilha.html',
                controller: 'TrilhaController',
                access: 'logado'
            })
            .when('/Trilha/Cadastrar', {
                templateUrl: 'App/trilha/trilha-cadastrar.html',
                controller: 'TrilhaCadastrarController',
                access: 'logado'
            })
            .when('/Trilha/:Id/Excluir', {
                templateUrl: 'App/trilha/trilha-excluir.html',
                controller: 'TrilhaExcluirController',
                access: 'logado'
            })
            .when('/Trilha/:Id/Cadastrar', {
                templateUrl: 'App/trilha/trilha-cadastrar.html',
                controller: 'TrilhaCadastrarController',
                access: 'logado'
            })
            .when('/Trilha/:Id', {
                templateUrl: 'App/trilha/trilha-detalhe.html',
                controller: 'TrilhaDetalheController',
                access: 'logado'
            }).
            when('/Palestrante', {
                templateUrl: 'App/palestrante/palestrante.html',
                controller: 'PalestranteController',
                access: 'logado'
            })
            .when('/Palestrante/Cadastrar', {
                templateUrl: 'App/palestrante/palestrante-cadastrar.html',
                controller: 'PalestranteCadastrarController',
                access: 'logado'
            })
            .when('/Palestrante/:Id/Excluir', {
                templateUrl: 'App/palestrante/palestrante-excluir.html',
                controller: 'PalestranteExcluirController',
                access: 'logado'
            })
            .when('/Palestrante/:Id/Cadastrar', {
                templateUrl: 'App/palestrante/palestrante-cadastrar.html',
                controller: 'PalestranteCadastrarController',
                access: 'logado'
            })
            .when('/Palestrante/:Id', {
                templateUrl: 'App/palestrante/palestrante-detalhe.html',
                controller: 'PalestranteDetalheController',
                access: 'logado'
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
    }

})();
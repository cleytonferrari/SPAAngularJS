(function () {
    'use strict';

    angular.module('MyApp').run(['$rootScope', '$location', '$http', 'Autenticacao', function ($rootScope, $location, $http, Autenticacao) {

        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            NProgress.start();
            
            $rootScope.alertType = "";
            $rootScope.alertMessage = "Loading...";
            $rootScope.active = "progress-striped active progress-warning";

            $rootScope.error = null;
            
            var nextAccess = (next == undefined) ? '' : next.access;

            if (!Autenticacao.authorize(nextAccess)) {
                if (Autenticacao.isLoggedIn()) {
                    //nao mostra porque ao redirecionar para o painel entra aqui denovo e limpa
                    //usar o toastr
                    $rootScope.error = "Você não tem permissão para acessar esta area";
                    $location.path('/Painel');
                } else $location.path('/Login');
            }
        });

        $rootScope.$on("$routeChangeSuccess", function (event, current, previous) {
            $rootScope.alertType = "alert-success";
            $rootScope.alertMessage = "Successfully changed routes :)";
            $rootScope.active = "progress-success";

            $rootScope.newLocation = $location.path();
            NProgress.done();
        });

        $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
            //alert("ROUTE CHANGE ERROR: " + rejection);
            $rootScope.alertType = "alert-error";
            $rootScope.alertMessage = "Failed to change routes :(";
            $rootScope.active = "";


             var destination = (current && (current.title || current.name || current.loadedTemplateUrl)) || 'rota não encontrada';
             
             var msg = 'Erro ao acessar ' + destination + '. ' + (rejection.msg || '');
             alert("ROUTE CHANGE ERROR: " + msg);
            
            NProgress.done();
        });

        $rootScope.alertType = "alert-info";
        $rootScope.alertMessage = "Welcome to the resolve demo";
    }]);


})();
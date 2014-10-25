(function () {
    'use strict';

    angular.module('MyApp').factory('PalestranteFactory', palestranteFactory);

    palestranteFactory.$inject = ['$resource', '$http'];

    function palestranteFactory($resource, $http) {
        var resource = $resource('http://localhost:6882/api/palestrantes/:Id', {}, {
            query: { method: 'GET', params: { Id: '' }, isArray: true },
            update: { method: 'PUT', params: { Id: '@Id' } }
        });

        $http.defaults.headers.common['Authorization'] = 'Bearer ' + new UsuarioLogado().getToken;

        return resource;
    };

})();
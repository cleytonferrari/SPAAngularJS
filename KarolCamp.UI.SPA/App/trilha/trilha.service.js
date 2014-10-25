(function () {
    'use strict';

    angular.module('MyApp').factory('TrilhaFactory', trilhaFactory);

    trilhaFactory.$inject = ['$resource', '$http'];
    
    function trilhaFactory($resource, $http) {
        var resource = $resource('http://localhost:6882/api/trilhas/:Id', {}, {
            query: { method: 'GET', params: { Id: '' }, isArray: true },
            update: { method: 'PUT', params: { Id: '@Id' } }
        });
    
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + new UsuarioLogado().getToken;

        return resource;
    };
    
})();
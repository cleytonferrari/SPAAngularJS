(function () {
    'use strict';

    angular.module('MyApp').factory('SalaFactory', salaFactory);

    salaFactory.$inject = ['$resource', '$http'];
    
    function salaFactory($resource, $http) {
        var resource = $resource('http://localhost:6882/api/salas/:Id', {}, {
            queryById: { method: 'GET', params: { Id: '' } },
            queryAll: { method: 'GET', isArray: true },
            update: { method: 'PUT', params: { Id: '@Id' } }
        });

        $http.defaults.headers.common['Authorization'] = 'Bearer ' + new UsuarioLogado().getToken;

        resource.prototype.getAll = function (successCb, failCb) {
            resource.queryAll({}, successCb, failCb);
        };

        resource.prototype.getById = function (id, successCb, failCb) {
            resource.queryById({ Id: id }, successCb, failCb);
        };

        return new resource;
    }

})();
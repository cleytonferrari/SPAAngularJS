myApp.factory('Sala', ['$resource', '$http', '$rootScope', function ($resource, $http, $rootScope) {

    var resource = $resource('http://localhost:6882/api/salas/:Id', {}, {
        query: { method: 'GET', params: { Id: '' }, isArray: true },
        update: { method: 'PUT', params: { Id: '@Id' } }
    });
    
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + new UsuarioLogado().getToken;

    return resource;
}]);
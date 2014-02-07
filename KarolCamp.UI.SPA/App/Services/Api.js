myApp.factory('Api', ['$resource', '$http', function ($resource, $http) {

    var url = 'http://localhost:6882/api/';

    function resourcePadrao(api) {
        return $resource(url + api + '/:Id', {}, {
            query: { method: 'GET', params: { Id: '' }, isArray: true },
            update: { method: 'PUT', params: { Id: '@Id' } }
        });
    }


    $http.defaults.headers.common['Authorization'] = 'Bearer ' + new UsuarioLogado().getToken;

    return {
        Sala: resourcePadrao('salas'),
        Trilha: resourcePadrao('trilhas')
    };
}]);
(function () {
    'use strict';

    angular.module('MyApp').factory('Autenticacao', autenticacaoFactory);

    autenticacaoFactory.$inject = ['$location', '$http', '$rootScope'];

    function autenticacaoFactory($location, $http, $rootScope) {
        function temPermissao(permissao) {
            //Todo: permissao deve ser um array de permissoes, para no caso do menu usar ..'suporte,financeiro'
            var roles = new UsuarioLogado().getRoles;
            for (var i = 0; i < roles.length; i++) {
                if (permissao == roles[i])
                    return true;
            }
            return false;
        }

        return {
            authorize: function (accessLevel) {
                if (accessLevel == 'publico')
                    return true;
                return temPermissao(accessLevel);
            },
            isLoggedIn: function () {
                return temPermissao('logado');
            },
            register: function (user, success, error) {

            },
            login: function (user, success, error) {
                $http.post('http://localhost:6882/Api/Usuarios/Token', user).success(function (user) {
                    user.roles = user.roles.split(',');
                    new UsuarioLogado().setUsuario(user);
                    $rootScope.user = user;
                    success(user);
                }).error(error);
            },
            logout: function (success) {
                new UsuarioLogado().removeUsuario();
                $rootScope.user = '';
                success();
            }
        };
    }

})();
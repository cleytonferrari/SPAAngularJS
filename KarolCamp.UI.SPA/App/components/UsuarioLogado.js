//todo: transformar em uma factory
'use strict';
function UsuarioLogado() {
    var self = this;
    self.getToken = getToken();
    self.getUsuario = getUsuario();
    self.getRoles = getPermissao();
    self.setUsuario = function (usuario) { return setUsuario(usuario); };
    self.removeUsuario = function () { removeUsuario(); };

    function getToken() {
        var usuario = JSON.parse(sessionStorage.getItem("usuario"));
        if (usuario)
            return usuario.access_token;

        return '';
    }

    function getUsuario() {
        var usuario = JSON.parse(sessionStorage.getItem("usuario"));
        if (usuario)
            return usuario;

        return '';
    }

    function getPermissao() {
        var usuario = JSON.parse(sessionStorage.getItem("usuario"));
        if (usuario)
            return usuario.roles;

        return [];
    }

    function setUsuario(usuario) {
        sessionStorage.removeItem("usuario");
        sessionStorage.setItem('usuario', JSON.stringify(usuario));
    }

    function removeUsuario() {
        sessionStorage.removeItem("usuario");
    }

}

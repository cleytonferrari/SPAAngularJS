(function () {
    'use strict';
    
    angular.module('MyApp').directive('activeNav', nivelAcesso);
    
    nivelAcesso.$inject = ['Autenticacao'];

    function nivelAcesso(Autenticacao) {
        return {
            restrict: 'A',
            link: function($rootScope, element, attrs) {
                var prevDisp = element.css('display'), nivelAcesso;

                $rootScope.$watch('user', function(newUser, oldUser) {
                    updateCSS();
                }, true);

                attrs.$observe('nivelAcesso', function(al) {
                    updateCSS();
                });

                function updateCSS() {
                    if (attrs.nivelAcesso) {
                        if (!Autenticacao.authorize(attrs.nivelAcesso))
                            element.css('display', 'none');
                        else
                            element.css('display', prevDisp);
                    }
                }
            }
        };

    }

})();
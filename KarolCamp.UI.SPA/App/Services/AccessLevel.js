'use strict';

angular.module('MyApp').directive('nivelAcesso', ['Autenticacao', function (Autenticacao) {
    return {
        restrict: 'A',
        link: function ($rootScope, element, attrs) {
            var prevDisp = element.css('display'), nivelAcesso;

            $rootScope.$watch('user', function (newUser, oldUser) {
                updateCSS();
            }, true);

            attrs.$observe('nivelAcesso', function (al) {
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
}]);


//marca a aba
angular.module('MyApp').directive('activeNav', ['$location', function ($location) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var nestedA = element.find('a')[0];
            var path = nestedA.href;

            scope.location = $location;
            scope.$watch('location.absUrl()', function (newPath) {
                if (path === newPath || path === newPath + '/' || path + '/' === newPath) {
                    element.addClass('active');
                } else {
                    element.removeClass('active');
                }
            });
        }

    };

}]);
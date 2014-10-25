(function () {
    'use strict';

    angular.module('MyApp').directive('activeNav', activeNav);
    
    activeNav.$inject = ['$location'];

    function activeNav($location) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var nestedA = element.find('a')[0];
                var path = nestedA.href;

                scope.location = $location;
                scope.$watch('location.absUrl()', function(newPath) {
                    if (path === newPath || path === newPath + '/' || path + '/' === newPath) {
                        element.addClass('active');
                    } else {
                        element.removeClass('active');
                    }
                });
            }
        };
    }

})();
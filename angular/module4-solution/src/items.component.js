(function() {
'use strict';

 angular.module('data')
    .component('items', {
        templateUrl: 'src/items.template.html',
        bindings: {
           items: '<'
        }
    });
})();
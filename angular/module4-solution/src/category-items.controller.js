(function () {
'use strict';

angular.module('data')
.controller('CategoryItemsController', CategoryItemsController);

CategoryItemsController.$inject = ['items']
function CategoryItemsController(items) {
  var categoryItems = this;
  categoryItems.items = items;
}

})();
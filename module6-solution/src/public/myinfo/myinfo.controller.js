(function () {
"use strict";

angular.module('public')
.controller('MyinfoController', MyinfoController);

MyinfoController.$inject = ['MenuItemService'];
function MyinfoController(MenuItemService) {
  var $ctrl = this;

  var userInformation = MenuItemService.getUserInformation();

  $ctrl.user = userInformation;

}

})();

(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController)
.service('MenuItemService', MenuItemService)
.constant('ApiBasePath', "https://vinicius-angularjs.herokuapp.com");

SignupController.$inject = ['MenuItemService'];
function SignupController(MenuItemService) {
  var $ctrl = this;

  $ctrl.submit = function () {
    var promise = MenuItemService.getMenuItem($ctrl.menuitem);

    promise.then(function (response) {
      MenuItemService.saveUserInformation($ctrl.firstname, $ctrl.lastname, $ctrl.email, $ctrl.phone, response.data);
      $ctrl.itemFound = true;
    })
    .catch(function (error) {
      $ctrl.itemNotFound = true;
      console.log("Something went terribly wrong.");
    });
  }
}


MenuItemService.$inject = ['$http', 'ApiBasePath'];
function MenuItemService($http, ApiBasePath) {
  var service = this;

  service.userInformation = {};

  service.getMenuItem = function (menuitem) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items/" + menuitem + ".json")
    });
    return response;
  };

  service.saveUserInformation = function (firstname, lastname, email, phone, menuitem) {
    service.userInformation = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      phone: phone,
      menuitem: menuitem
    }
  }

  service.getUserInformation = function () {
    return service.userInformation;
  }
}

})();

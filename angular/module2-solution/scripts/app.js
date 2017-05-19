(function() {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var controller = this;
        controller.toBuyList = ShoppingListCheckOffService.getToBuyList();
        controller.bought = function(index) {
            ShoppingListCheckOffService.buyItem(index);
        }
    }

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var controller = this;
        controller.boughtList = ShoppingListCheckOffService.getBoughtList();
    }

    function ShoppingListCheckOffService() {
	    var service = this;

	    var toBuyItems = [{ name: "cookies", quantity: 10 },
                          { name: "tomates", quantity: 8 },
                          { name: "bananas", quantity: 3 },
                          { name: "cervejas", quantity: 5 },
                          { name: "lasanhas", quantity: 12 }];

	    var boughtItems = [];

	    service.getToBuyList = function () {
            return toBuyItems;
        };


	    service.getBoughtList = function() {
            return boughtItems;
	    }

	    service.buyItem = function(index) {
            boughtItems.push(toBuyItems[index]);
            if (index > -1) {
                toBuyItems.splice(index, 1);
            }
        }
    }
})();

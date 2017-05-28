(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                found: '<',
                onRemove: '&'
            },
            restrict: 'E',
            controllerAs: 'narrow'
        };
        return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var controller = this;
        controller.searchTerm = "";

        controller.narrow = function() {
            if(controller.searchTerm) {
                var promise = MenuSearchService.getMatchedMenuItems(controller.searchTerm);
                promise.then(function (response) {
                    controller.found = response;
                })
                .catch(function (error) {
                    console.log("Something is not right...");
                });
            } else {
                controller.found = true;
            }
        }

        controller.onRemove = function(index) {
            if (index > -1) {
                controller.found.splice(index, 1);
            }
        };
    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
	    var service = this;

        service.getMatchedMenuItems = function(searchTerm) {
            return $http({
                method: "GET",
                url: "https://davids-restaurant.herokuapp.com/menu_items.json"
            }).then(function (result) {
                // process result and only keep items that match
                var foundItems = [];
                var item;
                for(item in result.data["menu_items"]) {
                    var description = result.data["menu_items"][item].description;
                    if(description.indexOf(searchTerm) !== -1) {
                        foundItems.push(result.data["menu_items"][item]);
                    }
                };
                // return processed items
                return foundItems;
            })
            .catch(function (error) {
                console.log("Error: ", error);
            });
        }
    }

})();

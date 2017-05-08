(function() {
    'use strict';

    angular.module('LunchCheck', [])
    .controller('LunchCkeckController', LunchCkeckController);

    LunchCkeckController.$inject = ['$scope'];

    function LunchCkeckController($scope) {

        $scope.checkIfTooMuch = function () {
            var itemList = $scope.items.split(",");
            var filteredList = [];

            for (var i = 0; i < itemList.length; i++) {
                console.log(itemList[i]);
                if(itemList[i].trim().length) {
                    filteredList.push(itemList[i]);
                }
            }
            if(filteredList.length > 3) {
                $scope.message = "Too much!";
            } else if (filteredList.length === 0) {
                $scope.message = "Please enter data first";
            } else {
                $scope.message = "Enjoy!";

            }
        }

    };

})();

(function() {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: 'src/home.template.html'
    })

    .state('categories', {
        url: '/all-categories',
        templateUrl: 'src/all-categories.template.html',
        controller: 'CategoriesController as categoriesCtrl',
        resolve: {
            categories: ['MenuDataService', function (MenuDataService) {
                return MenuDataService.getAllCategories();
            }]
        }
    })

    .state('categoryItems', {
        url: '/category-items/{categorySD}',
        templateUrl: 'src/category-items.template.html',
        controller: 'CategoryItemsController as categoryItemsCtrl',
        resolve: {
            items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
                return MenuDataService.getItemsForCategory($stateParams.categorySD);
            }]
        }
    });
}
})();
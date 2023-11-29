// URL is NOT updated, only programmatic STATE of the VIEW is updated.

(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up view states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/templates/home.template.html'
    // Contents in the above templateUrl will be inserted 
    // into the <ui-view> tag in index.html
  })

  // Categories page
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/templates/main-categories.template.html',
    controller: 'CategoriesController as categoriesList',
    resolve: {
      items: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
    // The resolve uses the MenuDataService to retrieve categories
    // and injects the returned data into the controller as 'items'.
  })
  // Items in a single category page
  .state('items', {
    url: '/items/{category}',
    templateUrl: 'src/templates/main-items.template.html',
    controller: 'ItemsController as itemsList',
    resolve: {
      items: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory($stateParams.category);
            }]
    }

  })
  ;
}

})();
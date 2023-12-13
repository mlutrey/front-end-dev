(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;
  service.user = {};

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };

  service.getMenuItems = function (category) {
    return $http.get(ApiPath + '/menu_items/' + category + '.json').then(function (response) {
      return response.data;
    });
  };

  service.getFavoriteMenuItem = function(short_name) {
     return $http.get(ApiPath + '/menu_items.json').then(function (response) {        
       var data = response.data; // ALL menu items
       var faveItem = {};

        // process result and try to find fave item
        for (var category_index in data) {
          for (var item_index in data[category_index].menu_items) {
            if (data[category_index].menu_items[item_index].short_name == short_name) {
              faveItem.category = data[category_index].category.short_name;
              faveItem.obj = data[category_index].menu_items[item_index];
              break;
            }
          }
        }      
      return faveItem;  
     });
  };

  service.menuItemExists = function(short_name) {
     return $http.get(ApiPath + '/menu_items.json').then(function (response) {
       var data = response.data; // ALL menu items
       var itemExists = false;

        // process result and try to find menu item
        for (var category_index in data) {
          for (var item_index in data[category_index].menu_items) {
            if (data[category_index].menu_items[item_index].short_name == short_name) {
              itemExists = true;
              break;
            }
          }
        }
      return itemExists;
     });
  };

  service.saveUser = function(user) {
    service.user = angular.copy(user);
  }

  service.getUser = function() {
    return service.user;
  }

}



})();

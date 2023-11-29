(function () {
'use strict';

// STEP 5
angular.module('data')
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http'];
function MenuDataService($http) {
  var service = this;

  // This method should return a promise 
  // which is a result of using the $http service
  service.getAllCategories = function () {
	return $http({
		method: "GET",
		url: ("https://coursera-jhu-default-rtdb.firebaseio.com/categories.json")
	})
	.then(function (result) {
     	return result.data; // return ALL categories
    });
  }

  // This method should return a promise 
  // which is a result of using the $http service
  // before the call to the server, your code should 
  // append whatever categoryShortName value was passed 
  // in as an argument
  service.getItemsForCategory = function (categoryShortName) {
	var pathToCatJSON = "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/" + categoryShortName + ".json";
	return $http({
		method: "GET",
		url: (pathToCatJSON)
	})
	.then(function (result) {
     	return result.data; // return ALL items for SINGLE category
    });

  }  
}


})();
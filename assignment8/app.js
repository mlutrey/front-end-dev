// The idea here is for the user to search the descriptions of menu items. 
// 
// Then, given the list of matches of the search, give the user the ability 
// to throw the items they for sure don't want off the list, thus narrowing 
// it down to what they do want.

(function () {
	'use strict';

	angular.module("NarrowItDownApp", [])
	.controller("NarrowItDownController", NarrowItDownController)
	.service('MenuSearchService',MenuSearchService)
	.constant('pathtoJSON',"https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json")
	.directive('foundItems', FoundItemsDirective);

	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService) {
		var narrowCtrl = this;
		
		narrowCtrl.searchTerm = "";
		
		narrowCtrl.searchMenu = function() {
		 	if (narrowCtrl.searchTerm.trim() != "") {
				MenuSearchService.getMatchedMenuItems(narrowCtrl.searchTerm)
				.then(function (response) {
					narrowCtrl.found = response;
				})
				.catch(function (error) {
					console.log("Something went wrong");
				})
		 	}
		};

		narrowCtrl.remove = function(index) {
			narrowCtrl.found.splice(index, 1);
		};
	};

	MenuSearchService.$inject = ['$http', 'pathtoJSON'];
	function MenuSearchService($http, pathtoJSON) {
		var service = this;

		// 1. This method is responsible for reaching out to the server 
		//    (using the $http service) to retrieve the list of all the menu items.
		// 2. Once all the menu items have been retrieved, loop through all items and 
		//    do a simple check if the searchString entered by the user appears anywhere
		//    in the DESCRIPTION of the item. If it does, the item gets placed in a separate
		//    'found' array. If it doesn't, simply move on to the next item.
		// 3. Once a list of found items is compiled, that list is returned, wrapped in a promise.

		service.getMatchedMenuItems = function (searchTerm) {
		// $http service is used to reach out to the server and retrieve 
		// ALL of the menu items located in the JSON file.
			return $http({
				method: "GET",
				url: (pathtoJSON)
			})
			.then(function (result) {
			    var foundItems = [];
		     	var data = result.data; // ALL menu items

			    // process result and only keep items that match
				for (var category_index in data) {
				 	for (var item_index in data[category_index].menu_items) {
						var description = data[category_index].menu_items[item_index].description;
						if (description.includes(searchTerm)) {
							foundItems.push(data[category_index].menu_items[item_index])
						}
					}
				}

			    // return processed items
			    return foundItems;
			 });			
		};			
	};

	function FoundItemsDirective() {
	  	var ddo = {
		    templateUrl: 'foundItems.html',
		    scope: {
		     	items: '<',
		      	onRemove: '&'
	    	},
		    controller: FoundItemsDirectiveController,
		    controllerAs: 'foundItemsCtrl',
		    bindToController: true	    	
  		}
	  return ddo;
	};

	function FoundItemsDirectiveController() {
	  var foundItemsCtrl = this;
	  foundItemsCtrl.noMatchingItemsFound = function() {
	    return foundItemsCtrl.items != undefined && foundItemsCtrl.items.length === 0;
	  }
	};	

})();
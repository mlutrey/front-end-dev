(function () {
	'use strict';

	angular.module("ShoppingListCheckOff", [])
	.controller("ToBuyController", ToBuyController)
	.controller("AlreadyBoughtController", AlreadyBoughtController)
	.service('ShoppingListCheckOffService',ShoppingListCheckOffService)
	.filter('showTotalPrice', ShowTotalPriceFilterFactory);

	ToBuyController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyController(ShoppingListCheckOffService) {
		var toBuy = this;

		toBuy.items = ShoppingListCheckOffService.getToBuyItems();

		toBuy.buyItems = function(ind) {
			ShoppingListCheckOffService.buyItems(ind);
		}
	};

	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtController(ShoppingListCheckOffService) {
		var alreadyBought = this;
		
		alreadyBought.items = ShoppingListCheckOffService.getBoughtItems();
	}

	function ShoppingListCheckOffService() {
		var service = this;

		var toBuyItems = [
			{
				name: "cookies", 
				quantity: 10, 
				pricePerItem: 2
			},
			{
				name: "milk cartons", 
				quantity: 2, 
				pricePerItem: 4
			},
			{
				name: "cakes", 
				quantity: 8, 
				pricePerItem: 10
			},
			{
				name: "cheese sticks", 
				quantity: 15, 
				pricePerItem: 1
			},
			{
				name: "yogurts",
				quantity: 5, 
				pricePerItem: 3
			}
		];

		var boughtItems = [];

		service.buyItems = function (ind) {
			boughtItems.push(toBuyItems[ind]);
			toBuyItems.splice(ind, 1);
		};

		service.getToBuyItems = function() {
			return toBuyItems;
		};

		service.getBoughtItems = function() {
			return boughtItems;
		};
	}

	function ShowTotalPriceFilterFactory() {
		return function (input) {
			var totalPrice = input.quantity * input.pricePerItem;
			var output = "$$$" + totalPrice + ".00";
 		return output;
		}
	}

})();
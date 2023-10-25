(function () {
	'use strict';

	angular.module("ShoppingListCheckOff", [])
	.controller("ToBuyController", ToBuyController)
	.controller("AlreadyBoughtController", AlreadyBoughtController)
	.service('ShoppingListCheckOffService',ShoppingListCheckOffService)
	.filter('showBuyItem', ShowBuyItemFilterFactory)
	.filter('showBoughtItem', ShowBoughtItemFilterFactory);

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
				pricePerItem: .75
			},
			{
				name: "milk cartons", 
				quantity: 2, 
				pricePerItem: 3
			},
			{
				name: "cakes", 
				quantity: 8, 
				pricePerItem: 10
			},
			{
				name: "cheese sticks", 
				quantity: 15, 
				pricePerItem: .5
			},
			{
				name: "yogurts",
				quantity: 5, 
				pricePerItem: 1.5
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

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

	function ShowBuyItemFilterFactory() {
		return function (input) {
			var output = "Buy " + input.quantity + " " + input.name;
			return output;
		}
	}

	function ShowBoughtItemFilterFactory() {
		return function (input) {
			var totalPrice = input.quantity * input.pricePerItem;
			var output = "Bought " + input.quantity + " of " + input.name + " for total price of " + "$$$" + input.pricePerItem;
 		return output;
		}
	}

	function CalculateTotalPrice() {
		return function (input) {
			var totalPrice = input.quantity * input.pricePerItem;
			return totalPrice;
		}
	}

})();
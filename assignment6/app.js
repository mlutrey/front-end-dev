(function () {
	'use strict';

	angular.module("LunchCheck", [])
	.controller("LunchCheckController", LunchCheckController);

	LunchCheckController.$inject = ['$scope'];
	function LunchCheckController($scope) {
		$scope.lunchlist = "";
		$scope.message = "";
		$scope.messagecolor = "black";
		$scope.bordercolor = "black";

		$scope.checkLunchList = function () {
			var strSplit = $scope.lunchlist.split(",");
			// remove empty strings from array
			strSplit = strSplit.filter(removeEmptyStrings);

			// If # of items in textbox = 0: set "Please enter data first" to the message
			if (strSplit.length == 0) {
				$scope.message = "Please enter data first";
				$scope.messagecolor = "red";
				$scope.bordercolor = "red";
			} else if (strSplit.length <= 3) {
			// If # of items in textbox <= 3: set "Enjoy!" to the message
				$scope.message = "Enjoy!";
				$scope.messagecolor = "green";
				$scope.bordercolor = "green";
			} else {
				// If # of items in textbox > 3: set "Too much!" to the message
				$scope.message = "Too much!";
				$scope.messagecolor = "green";
				$scope.bordercolor = "green";
			}
		};

		function removeEmptyStrings (item) {
			return item.trim() != "";
		}
	};
})();
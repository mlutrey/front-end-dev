(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['MenuService'];
function SignupController(MenuService) {
  var $ctrl = this;
  
  $ctrl.user = {};

  $ctrl.submit = function () {
    MenuService.getFavoriteMenuItem($ctrl.user.faveDishShortName).then(function (response) {
      if (angular.equals(response, {})) {
        $ctrl.invalidFaveItem = true;
      } else {
        $ctrl.invalidFaveItem = false;
        $ctrl.signupComplete = true;

        $ctrl.user.faveDish = response;
        MenuService.saveUser($ctrl.user);
      }
    })
    .catch(function (error) {
      console.log("Something went wrong");
    })
  };

  $ctrl.checkFaveDishValidity = function () {

    if ($ctrl.user.faveDishShortName != undefined) {
      MenuService.menuItemExists($ctrl.user.faveDishShortName).then(function (response) {
        if (angular.equals(response, false)) {
          $ctrl.invalidFaveItem = true;
        } else {
          $ctrl.invalidFaveItem = false;
        }
      })
      .catch(function (error) {
        console.log("Something went wrong");
      })
    }
  };
};


})();
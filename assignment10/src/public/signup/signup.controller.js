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
};


})();
(function () {
"use strict";

angular.module('public')
.controller('InfoController', InfoController);

InfoController.$inject = ['MenuService'];
function InfoController(MenuService) {
  var $ctrl = this;

  $ctrl.user = MenuService.getUser();
  $ctrl.signupComplete = false;

  if (!angular.equals($ctrl.user, {})) {
    $ctrl.signupComplete = true;
  }

}


})();
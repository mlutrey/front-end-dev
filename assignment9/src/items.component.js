(function () {
'use strict';

// STEP 7

// The categories and the items components should NOT 
// directly use the MenuDataService to fetch their own data. 
// Instead, the proper data should be simply passed into the 
// component. (Hint: use the one-way < binding)
angular.module('data')
.component('items', {
  templateUrl: 'src/templates/items.template.html',
  bindings: {
    items: '<'
  }	
});


})();
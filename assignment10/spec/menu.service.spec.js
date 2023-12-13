describe('testFunctionMenuItemExists', function () {

  var menuService;
  var $httpBackend;
  var ApiBasePath;
  var testItem1;
  var testItem2;

  beforeEach(function () {
    module('common');


    inject(function ($injector) {
      menuService = $injector.get('MenuService');
      $httpBackend = $injector.get('$httpBackend');
      ApiBasePath = $injector.get('ApiPath');
      testItem1 = "A2";
      testItem2 = "L1";
    });
  });

  it('should return true', function() {
    $httpBackend.whenGET(ApiBasePath + '/menu_items.json').respond({ "A": {"menu_items": [{"short_name": "A1"}, {"short_name": "A2"}] }});
    menuService.menuItemExists(testItem1).then(function(response) {
      expect(response).toEqual(true);
    });
    $httpBackend.flush();
  });

  it('should return false', function() {
    $httpBackend.whenGET(ApiBasePath + '/menu_items.json').respond({ "A": {"menu_items": [{"short_name": "A1"}, {"short_name": "A2"}] }});
    menuService.menuItemExists(testItem2).then(function(response) {
      expect(response).toEqual(false);
    });
    $httpBackend.flush();
  });
});
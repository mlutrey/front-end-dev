describe('testFunctionMenuItemExists', function () {

  var menuService;
  var $httpBackend;
  var ApiBasePath;

  beforeEach(function () {
    module('common');

    inject(function ($injector) {
      menuService = $injector.get('MenuService');
      $httpBackend = $injector.get('$httpBackend');
      ApiBasePath = $injector.get('ApiPath');
    });
  });

  it('should return true', function() {
    $httpBackend.whenGET(ApiBasePath + '/menu_items.json').respond({ "A": {"menu_items": [{"short_name": "A1"}, {"short_name": "A2"}] }});
    menuService.menuItemExists("A2").then(function(response) {
      expect(response).toEqual(true);
    });
    $httpBackend.flush();
  });
});
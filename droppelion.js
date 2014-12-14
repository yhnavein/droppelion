/*global console:false, topojson:false, queue:false, d3:false */
var app = angular.module('droppelion', []);

app.directive('droppelion', function($timeout, $http, $filter, $q, $document) {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    scope: {
      dynamic: '=',
      endpoint: '=',
      traverse: '@',
      prompt: '@',
      item: '=',
      api: '=',
      controlId: '@',
      title: '@',
      onSelect: '&',
      onNewItemSelect: '&'
    },
    link: function(scope, elem, attrs) {
      var self = {};

      if(!attrs.dynamic) attrs.dynamic = true;
      if(typeof attrs.dynamic === 'string')
        attrs.dynamic = attrs.dynamic.toLowerCase() === 'true';

      if(attrs.dynamic){
        scope.$watch('itemName', function() {
          scope.filteredItems = $filter('filter')(scope.items, scope.itemName);
        });
      }

      scope.$watch('item', function() {
        if(scope.selected && !angular.equals( scope.item, self.selItem )){
          scope.clearSelection();
        }
      });

      self.hideDropDown = function() {
        self.cancelActiveRequest();
        scope.loading = false;
        scope.dropDownVisible = false;
        scope.filteredItems = [];
      };

      self.cancelActiveRequest = function() {
        if(self.canceler)
          self.canceler.resolve();
      };

      self.getItems = function(data) {
        var dataToShow = (scope.traverse ? data[scope.traverse] : data);
        scope.items = dataToShow;
        scope.loading = false;
        scope.dropDownVisible = true;
        scope.filteredItems = scope.items;
      };

      self.logQueryError = function(err) {
        if(err == null)
          return; //request was cancelled.

        console.error(err);
        self.hideDropDown();
      };

      self.makeSearchRequest = function(query) {
        if(!query || query.length < 2){
          self.hideDropDown();

          if(self.searchTimeout != null)
            $timeout.cancel(self.searchTimeout);

          return;
        }

        if(self.searchTimeout != null)
          $timeout.cancel(self.searchTimeout);

        self.searchTimeout = $timeout(function() {
          scope.loading = true;

          self.cancelActiveRequest();

          self.canceler = $q.defer();
          $http.get(scope.endpoint, {params: {q: query}, timeout: self.canceler.promise})
            .success(self.getItems)
            .error(self.logQueryError);
        }, 200);
      };

      if(!attrs.dynamic) {
        scope.loading = true;
        $http.get(scope.endpoint)
          .success(self.getItems)
          .error(self.logQueryError);
      }

      //custom blur
      $document.on('click', function(ev) {
        var isChild = elem.find(ev.target).length > 0;

        if(!isChild) {
          scope.$apply(function() {
            scope.focused = false;
            self.hideDropDown();
          });
        }
      });

      scope.handleSelection = function(selectedItem) {
        if(selectedItem == null){
          selectedItem = scope.filteredItems[scope.current];

          if(selectedItem == null)
            return;
        }
        self.selItem = angular.copy(selectedItem);
        scope.item = selectedItem;
        scope.itemName = selectedItem[scope.title];
        scope.current = 0;
        scope.selected = true;
        self.hideDropDown();
        scope.onSelect();
      };

      scope.clearSelection = function() {
        scope.selected = false;
        scope.item = {};
        scope.itemName = '';
      };

      scope.newItemClicked = function(name) {
        self.hideDropDown();
        scope.focused = false;
        self.hideDropDown();

        if(scope.onNewItemSelect != null && typeof scope.onNewItemSelect === 'function')
          scope.onNewItemSelect();
      };

      scope.current = 0;
      scope.dropDownVisible = false; // hides the list initially
      scope.isCurrent = function(index) {
        return scope.current == index;
      };
      scope.setCurrent = function(index) {
        scope.current = index;
      };
      scope.changedSearch = function() {
        if(!attrs.dynamic)
          return;

        self.makeSearchRequest(scope.itemName);
      };

      scope.api = {
        selectItem: scope.handleSelection,
        itemName: function() {
          return scope.itemName;
        }
      };

      elem.on('keydown keypress paste', function (e) {
        if(e.keyCode === 9) { //TAB
          scope.focused = false;
          self.hideDropDown();
          scope.$apply();
          return;
        }

        if(scope.filteredItems == null)
          return;

        if(e.keyCode === 13) { //ENTER
          scope.handleSelection(null);
          return;
        }
        if(e.keyCode === 27) { //ESC
          self.hideDropDown();
          return;
        }
        if(e.keyCode === 38) { //UP
          if(scope.current === 0)
            scope.current = scope.filteredItems.length - 1;
          else
            scope.current--;
        }
        else if(e.keyCode === 40) { //DOWN
          if(scope.current === scope.filteredItems.length - 1)
            scope.current = 0;
          else
            scope.current++;
        }
        scope.$apply();
        scope.dropDownVisible = true;
      });
    },
    templateUrl: '/templates/droppelion.html'
  };
});

app.directive('spyScroll', function(){
  function updateScroll($list, index) {
    var el = $list.children().eq(index);
    if(el == null || el.length === 0){
      $list.scrollTop(0);
      return;
    }

    var elTop = el.position().top;
    var elBottom = elTop + el.outerHeight();
    var scrollTop = $list.scrollTop();
    var resHeight = $list.outerHeight();

    if(elTop < 0)
      $list.scrollTop(scrollTop + elTop);

    if(elBottom > resHeight)
      $list.scrollTop(scrollTop + elBottom - resHeight);
  }

  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      scope.$watch('current', function (newVal, oldVal) {
        if(newVal != oldVal)
          updateScroll(element, newVal);
      });
    }
  };
});
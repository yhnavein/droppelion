/*global console:false, topojson:false, queue:false, d3:false */
var app = angular.module('droppelion', []);

app.directive('droppelion', function($timeout, $http, $filter) {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    scope: {
      dynamic: '=',
      endpoint: '=',
      prompt: '@',
      item: '=',
      controlId: '@',
      title: '@',
      onSelect: '&'
    },
    link: function(scope, elem, attrs) {
      var self = {};

      if(!attrs.dynamic) attrs.dynamic = true;
      if(typeof attrs.dynamic === 'string')
        attrs.dynamic = attrs.dynamic.toLowerCase() === 'true';

      scope.$watch('itemName', function() {
        scope.filteredItems = $filter('filter')(scope.items, scope.itemName);
      });

      self.getItems = function(data) {
        scope.items = data;
        scope.loading = false;
      };

      self.makeSearchRequest = function(query) {
        if(!query || query.length < 2){
          scope.selected = true;

          if(self.searchTimeout != null)
            $timeout.cancel(self.searchTimeout);

          return;
        }

        if(self.searchTimeout != null)
          $timeout.cancel(self.searchTimeout);

        self.searchTimeout = $timeout(function() {
          scope.loading = true;
          $http.get(scope.endpoint, {params: {q: query}})
            .success(self.getItems)
            .error(function(e) {
              console.error(e);
              scope.items = [];
              scope.selected = true;
              scope.loading = false;
            });
        }, 200);
      };

      if(!attrs.dynamic) {
        scope.loading = true;
        $http.get(scope.endpoint)
          .success(self.getItems)
          .error(function(e) {
            console.error(e);
            scope.items = [];
            scope.selected = true;
            scope.loading = false;
          });
      }

      scope.blur = function() {
        scope.focused = false;
        scope.selected = true;
      };

      scope.handleSelection = function(selectedItem) {
        if(selectedItem == null){
          selectedItem = scope.filteredItems[scope.current];
        }
        scope.item = selectedItem;
        scope.itemName = selectedItem[scope.title];
        scope.current = 0;
        scope.selected = true;
        $timeout(function() {
          scope.onSelect();
        }, 200);
      };
      scope.current = 0;
      scope.selected = true; // hides the list initially
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
      scope.keyPressed = function(e) {
        if(scope.filteredItems == null)
          return;

        if(e.keyCode === 13){ //ENTER
          scope.handleSelection(null);
          return;
        }
        if(e.keyCode === 27 || e.keyCode === 9){ //ESC
          scope.selected = true;
          return;
        }
        if(e.keyCode === 38) {  //UP
          if(scope.current === 0)
            scope.current = scope.filteredItems.length-1;
          else
            scope.current--;
        }
        if(e.keyCode === 40) {//DOWN
          if(scope.current === scope.filteredItems.length-1)
            scope.current = 0;
          else
            scope.current++;
        }

        scope.selected = false;
      };
    },
    templateUrl: 'templates/droppelion.html'
  };
});
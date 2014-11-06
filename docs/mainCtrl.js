/*global console:false*/
var app = angular.module('test', ['droppelion']);

app.controller('MainCtrl', function($scope, $http) {
  var self = this;

  $scope.search = function() {

    self.refreshData();
  };

  $scope.openProductsModal = function() {
    console.log('Something is happening.');

    $scope.productApi.selectItem({
      id: 123, name: 'Jack Daniels'
    });
  };

  $scope.onItemSelected = function() {
    console.log('Item selection callback!');
  };

  $scope.clearSelection = function() {
    $scope.product = {};
  };

});
/*global console:false*/
var app = angular.module('test', ['droppelion']);

app.controller('MainCtrl', function($scope, $http) {
  var self = this;

  $scope.search = function() {

    self.refreshData();
  };

  $scope.openProductsModal = function() {
    console.log('Something is happening.');

    $scope.prodModalVisible = true;
  };

  $scope.acceptProduct = function() {
    var item = newProd;
    $scope.productApi.selectItem(item);
    $scope.prodModalVisible = false;
  };

  $scope.discardProduct = function() {
    $scope.product = {};
    $scope.prodModalVisible = false;
  };

  $scope.onItemSelected = function() {
    console.log('Item selection callback!');
  };

  $scope.clearSelection = function() {
    $scope.product = {};
  };

});
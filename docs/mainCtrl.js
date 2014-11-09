/*global console:false*/
var app = angular.module('test', ['droppelion']);

app.controller('MainCtrl', function($scope, $http, $timeout) {
  var self = this;

  $scope.newProd = null;

  $scope.search = function() {

    self.refreshData();
  };

  $scope.openProductsModal = function() {
    console.log('Something is happening.');

    var prodName = $scope.productApi.itemName();

    $scope.newProd = {
      name: prodName,
      producer: '',
      code: ''
    };

    $scope.prodModalVisible = true;
    $timeout(function() {
      angular.element('.product-modal .form-control:first').focus();
    }, 50);
  };

  $scope.acceptProduct = function() {
    $scope.productApi.selectItem($scope.newProd);
    $scope.prodModalVisible = false;
  };

  $scope.discardProduct = function() {
    $scope.product = null;
    $scope.prodModalVisible = false;
  };

  $scope.onItemSelected = function() {
    console.log('Item selection callback!');
  };

  $scope.clearSelection = function() {
    $scope.product = {};
  };

});
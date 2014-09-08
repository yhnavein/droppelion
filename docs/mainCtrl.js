/*global console:false*/
var app = angular.module('test', ['droppelion']);

app.controller('MainCtrl', function($scope, $http) {
  var self = this;

  $scope.search = function() {

    self.refreshData();
  };

  $scope.countryPretty = function() {
    return JSON.stringify($scope.country, null, 2);
  };

  $scope.onItemSelected = function() {
    console.log('Item selection callback!');
  };

  $scope.clearSelection = function() {
    $scope.country = {};
  };

});
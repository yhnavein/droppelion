/*global console:false*/
var app = angular.module('test', ['droppelion']);

app.controller('MainCtrl', function($scope, $http) {
  var self = this;

  $scope.search = function() {

    self.refreshData();
  };
});
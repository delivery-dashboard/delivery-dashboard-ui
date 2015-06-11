
    'use strict';

    angular.module('deliveryDashboardUi').controller('MainCtrl', function ($scope, Restangular) {

      Restangular.setBaseUrl("http://localhost:8080/api")

      //$scope.periods = [{id:1}];
      $scope.periods = Restangular.all('periods').getList().$object;

      $scope.projects = Restangular.all('projects').getList().$object;

    });


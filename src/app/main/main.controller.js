
    'use strict';

    angular.module('deliveryDashboardUi').controller('MainCtrl', function ($scope, Restangular) {

      Restangular.setBaseUrl("http://54.207.125.128:8080/api")

      //$scope.periods = [{id:1}];
      $scope.periods = Restangular.all('periods').getList().$object;

      $scope.projects = Restangular.all('projects').getList().$object;

      $scope.criterias = Restangular.all('criterias').getList().$object;

      $scope.criteriaValues = ["yes", "no", "good", "danger", "warning"];

      $scope.$watch("selectedPeriod", function(value){
        $scope.reports = Restangular.all('periods/' + value +'/reports').getList().$object;
      });

      $scope.findReport = function(project, criteria){
        return _.find($scope.reports, {'project_id': project.id, 'criteria_id': criteria.id}).situation;
      }

    });


'use strict';

angular.module('deliveryDashboardUi', ['ngAnimate', 'restangular', 'ui.router', 'mgcrea.ngStrap'])
  .config(function ($stateProvider, $urlRouterProvider, RestangularProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });

    RestangularProvider.setDefaultHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    });

    $urlRouterProvider.otherwise('/');
  })
;

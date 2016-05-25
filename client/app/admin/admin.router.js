'use strict';

angular.module('debteeApp.admin')
  .config(function($stateProvider) {
    $stateProvider
      .state('debt.admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminController',
        controllerAs: 'admin',
        authenticate: 'admin'
      });
  });

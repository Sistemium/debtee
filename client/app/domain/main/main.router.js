'use strict';

angular.module('debteeApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('debt', {
        abstract: true,
        template: '<div ui-view></div>'
      })
      .state('debt.main', {
        url: '/?access-token',
        templateUrl: 'app/domain/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm'
      });
  });

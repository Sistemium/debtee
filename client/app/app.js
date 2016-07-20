'use strict';

(function () {

  angular.module('debteeApp.dependencies', [
    'ngSanitize',
    'ui.router',
    'ui.router.stateHelper',
    'validation.match',
    'LocalStorageModule',
    'formly',
    'formlyBootstrap',
    'ngclipboard',
    'angularMoment',
    'cgBusy',
    'sistemium',
    'sistemiumAngularAuth',
    'sistemiumBootstrap'
  ]);

  angular.module('debteeApp', [
      'debteeApp.dependencies',
      'debteeApp.core',
      'debteeApp.admin',
      'debteeApp.constants'
    ])

    .run(function ($rootScope, InitService, sabErrorsService) {
      //subscribe for logged-in event
      $rootScope.$on('logged-in',function(){
        InitService.init();
      });

      //add function to $rootScope to add errors
      $rootScope.addError = function (error) {
        sabErrorsService.addError(error);
      };
    });

}());

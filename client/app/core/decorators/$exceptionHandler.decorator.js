'use strict';

(function () {

  angular.module('debteeApp')
    .config(function ($provide) {
      $provide.decorator('$exceptionHandler', function ($delegate, $injector) {
        return function (exception, cause) {
          var $rootScope = $injector.get('$rootScope');
          $rootScope.addError({message: 'Exception', reason: exception});
          $delegate(exception, cause);
        };
      });
    });

}());

(function (ng) {
  'use strict';
   ng.module('debteeApp.core.services')
     .factory('Auth', function (saAuth, appConfig) {
       var config = {
         authUrl: appConfig.authUrl
       };
       return saAuth(config);
     });

})(angular);

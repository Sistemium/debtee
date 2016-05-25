(function (ng) {
  'use strict';
   ng.module('debteeApp.core.services')
     .factory('Auth', function (saAuth, appConfig) {
       var config = {
         authUrl: appConfig.authUrl,
         userRoles: appConfig.userRoles
       };
       return saAuth(config);
     })

})(angular);

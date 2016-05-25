(function (ng) {
  'use strict';
   ng.module('debteeApp.core.services')
     .factory('Auth', function (saAuth, appConfig) {
       var config = {
         url: appConfig.authUrl
       };
       return saAuth(config);
     })

})(angular);

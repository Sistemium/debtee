(function (ng) {
  'use strict';
   ng.module('debteeApp.core.services')
     .factory('Auth', function (saAuth, Schema, appConfig) {
       var config = {
         authUrl: appConfig.authUrl,
         Account: Schema.model('account')
       };
       return saAuth(config);
     })

})(angular);

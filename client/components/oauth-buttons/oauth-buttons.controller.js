'use strict';

angular.module('debteeApp')
  .controller('OauthButtonsCtrl', function($window, appConfig) {
    this.loginOauth = function(provider) {
      $window.location.href = appConfig.authUrl + '/auth/' + provider;
    };
  });

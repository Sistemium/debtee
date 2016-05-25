'use strict';

angular.module('authApiApp')
  .controller('OauthButtonsCtrl', function($window, appConfig) {
    this.loginOauth = function(provider) {
      $window.location.href = appConfig.authUrl + 'auth/' + provider;
    };
  });

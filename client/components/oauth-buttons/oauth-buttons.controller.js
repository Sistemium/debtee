'use strict';

angular.module('debteeApp')
  .controller('OauthButtonsCtrl', function($window, appConfig) {
    this.loginOauth = function(provider) {
      var href = appConfig.authUrl + '/auth/' + provider;
      href += '?redirect_uri=' + appConfig.redirect_uri + '&orgAppId=' + appConfig.orgAppId;
      $window.location.href = href;
    };
  });

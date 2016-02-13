'use strict';

(function() {

function authInterceptor($q, $injector, localStorageService, Util) {
  var state;
  return {
    // Add authorization token to headers
    request(config) {
      config.headers = config.headers || {};
      if (localStorageService.get('access-token') && Util.isSameOrigin(config.url)) {
        config.headers['access-token'] = localStorageService.get('access-token');
      }
      return config;
    },

    // Intercept 401s and redirect you to login
    responseError(response) {
      if (response.status === 401) {
        (state || (state = $injector.get('$state'))).go('login');
        // remove any stale tokens
        localStorageService.remove('access-token');
      }
      return $q.reject(response);
    }
  };
}

angular.module('authApiApp.auth')
  .factory('authInterceptor', authInterceptor);

})();

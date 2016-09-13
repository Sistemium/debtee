'use strict';

(function () {

  function schema(saSchema, $http, appConfig) {
    //pass object to saSchema to override methods
    return saSchema({
      getCount: function (params) {

        return $http
          .get(
            appConfig.jsDataBasePath + '/' + this.endpoint,
            {
              params: angular.extend({
                'agg:': 'count'
              }, params || {})
            }
          )

          .then(function (res) {
            return parseInt(res.headers('x-aggregate-count'));
          });
      }
    });
  }

  angular.module('debteeApp.core.models', [
      'sistemium',
      'debteeApp.constants'
    ])
    .config(function (DSHttpAdapterProvider, appConfig) {
      angular.extend(DSHttpAdapterProvider.defaults, {
        basePath: appConfig.jsDataBasePath
      });
    })
    .service('schema', schema)
    .service('models', function (schema) {
      return schema.models();
    })
    .run(function (DS, $rootScope) {
      $rootScope.$on('logged-off', function () {
        DS.clear();
      });
    });

}());

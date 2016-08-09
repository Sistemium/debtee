(function (ng) {
  'use strict';
  ng.module('debteeApp.admin.models')
    .run(function (schema) {
      schema.register({
        name: 'provider'
      });
    })
  ;

})(angular);

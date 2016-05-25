(function (ng) {
  'use strict';
  ng.module('debteeApp.admin.models')
    .run(function (Schema) {
      Schema.register({
        name: 'provider'
      });
    })
  ;

})(angular);

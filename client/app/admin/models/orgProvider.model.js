(function (ng) {
  'use strict';
  ng.module('debteeApp.admin.models')
    .run(function (schema) {
      schema.register({
        name: 'orgProvider',
        relations: {
          belongsTo: {
            org: {
              localField: 'org',
              localKey: 'orgId'
            },
            provider: {
              localField: 'provider',
              localKey: 'providerId'
            }
          }
        }
      });
    })
  ;

})(angular);

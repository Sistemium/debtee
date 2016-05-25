(function (ng) {
  'use strict';
  ng.module('debteeApp.admin.models')
    .run(function (Schema) {
      Schema.register({
        name: 'org',
        relations: {
          hasMany: {
            orgProvider: {
              localField: 'orgProvider',
              foreignKey: 'orgProviderId'
            }
          }
        }
      });
    })
  ;

})(angular);

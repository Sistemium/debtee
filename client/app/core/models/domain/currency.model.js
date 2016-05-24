'use strict';

(function () {

  angular.module('authApiApp')
    .run(function (Schema) {
      Schema.register({
        name: 'currency',
        relations: {
          hasMany: {
            operation: {
              localField: 'operations',
              foreignKey: 'currencyId'
            },
            agent: {
              localField: 'agents',
              foreignKey: 'currencyId'
            }
          }
        }
      });
    });

}());

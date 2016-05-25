'use strict';

(function () {

  angular.module('debteeApp')
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

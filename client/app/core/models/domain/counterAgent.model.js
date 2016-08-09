'use strict';

(function () {

  angular.module('debteeApp')
    .run(function (schema) {
      schema.register({
        name: 'counterAgent',
        relations: {
          hasMany: {
            contact: {
              localField: 'contacts',
              foreignKey: 'counterAgentId'
            }
          }
        }
      });
    });

}());

'use strict';

(function () {

  angular.module('debteeApp')
    .run(function (Schema) {
      Schema.register({
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

'use strict';

(function () {

  angular.module('authApiApp')
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

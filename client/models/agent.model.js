'use strict';

(function () {

  angular.module('authApiApp')
    .factory('Agent', function (DS) {
      return DS.defineResource({
        name: 'agent',
        relations: {
          hasMany: {
            contact: {
              localField: 'contacts',
              foreignKey: 'agent'
            },
            agentInvites: [
              {
                localField: 'ownerInvites',
                foreignKey: 'owner'
              }, {
                localField: 'acceptorInvites',
                foreignKey: 'acceptor'
              }
            ],
            agentOperations: [
              {
                localField: 'lenderOperations',
                foreignKey: 'lender'
              },
              {
                localField: 'debtorOperations',
                foreignKey: 'debtor'
              }
            ]
          }
        },
        validate: function (Agent, agent, cb) {
          var agentSchema = {
            name: {
              presence: true
            }
          };

          var err = validate(agent, agentSchema);
          if (err) {
            cb(err);
          } else {
            cb(null, agent);
          }
        }
      });
    })
    .run(function (Agent) {
      console.log (Agent);
    });

}());

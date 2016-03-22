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
              foreignKey: 'ownerAgentId'
            },
            invite: [
              {
                localField: 'invites',
                foreignKey: 'ownerAgentId'
              },
              {
                localField: 'acceptedInvites',
                foreignKey: 'acceptorAgentId'
              }
            ]
          },
          hasOne: {
            currency: {
              localField: 'currency',
              localKey: 'currencyId'
            }
          }
        }
      });
    })
    .run(function (Agent, FormlyConfigService) {
      var fields = [
        {
          key: 'name',
          type: 'input',
          templateOptions: {
            label: 'Name:',
            type: 'text',
            placeholder: 'Name',
            required: true
          }
        },{
          key: 'currencyId',
          type: 'select',
          templateOptions: {
            label: 'Default currency:',
            options: [],
            valueProp: 'id',
            labelProp: 'symbol'
          }
        }
      ];

      FormlyConfigService.setConfig('agent', fields);
    });

}());

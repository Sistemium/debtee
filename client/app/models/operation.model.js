'use strict';

(function () {

  angular.module('authApiApp')
    .factory('Operation', function (DS) {
      return DS.defineResource({
        name: 'operation',
        relations: {
          belongsTo: {
            counterAgent: [
              {
                localField: 'lender',
                localKey: 'lenderId'
              },
              {
                localField: 'debtor',
                localKey: 'debtorId'
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
    .run(function (Operation) {
      Operation.fields = [
        {
          key: 'counterAgentId',
          type: 'select',
          templateOptions: {
            label: 'Counter-agent',
            labelProp: 'name',
            valueProp: 'id',
            description: 'The other agent of the operation',
            options: []
          }
        },
        {
          key: 'total',
          type: 'input',
          templateOptions: {
            label: 'Total',
            type: 'number',
            placeholder: 'Total',
            required: true,
            description: 'Enter total'
          }
        },
        {
          key: 'currencyId',
          type: 'select',
          templateOptions: {
            label: 'Select currency',
            labelProp: 'symbol',
            valueProp: 'id',
            description: 'Currency of the operation',
            options: []
          }
        },
        {
          key: 'role',
          type: 'radio',
          templateOptions: {
            label: 'Choose type of operation',
            options: [
              {
                name: 'Borrow',
                value: 'debt'
              },
              {
                name: 'Lend',
                value: 'lend'
              }
            ]
          }
        }
      ];
    });

}());

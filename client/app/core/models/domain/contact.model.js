'use strict';

(function () {

  angular.module('debteeApp')

    .run(function (schema, saFormlyConfigService) {
      schema.register({
        name: 'contact',
        relations: {
          belongsTo: {
            agent: {
              localField: 'owner',
              localKey: 'ownerAgentId',
              parent: true
            },
            counterAgent: {
              localField: 'counterAgent',
              localKey: 'counterAgentId'
            }
          }
        }
      });

      var fields = [
        {
          key: 'counterAgentEntity.name',
          type: 'input',
          templateOptions: {
            type: 'text',
            disabled: true,
            label: 'Contact name'
          }
        }
      ];

      var contactAdd = [{
        key: 'inviteCode',
        type: 'input',
        templateOptions: {
          placeholder: 'Enter invite code',
          type: 'text',
          label: 'Invite code',
          required: true
        }
      }, {
        key: 'mobileNumber',
        type: 'input',
        templateOptions: {
          placeholder: 'Search by mobile number',
          type: 'text',
          disabled: true,
          label: 'Sms'
        }
      }, {
        key: 'email',
        type: 'input',
        templateOptions: {
          placeholder: 'Search by email',
          type: 'text',
          disabled: true,
          label: 'Email'
        }
      }];

      saFormlyConfigService.setConfig('contact', fields);
      saFormlyConfigService.setConfig('contactAdd', contactAdd);
    });

}());

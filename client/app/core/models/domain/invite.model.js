'use strict';

(function () {

  angular.module('debteeApp')

    .run(function (schema, saFormlyConfigService) {
      schema.register({
        name: 'invite',
        relations: {
          belongsTo: {
            agent: {
              localField: 'ownerAgent',
              localKey: 'ownerAgentId'
            }
          },
          hasOne: {
            counterAgent: {
              localField: 'acceptorAgent',
              localKey: 'acceptorAgentId'
            },
            socialAccount: [{
              localField: 'inviter',
              localKey: 'inviterSocialAccountId'
            },{
              localField: 'invitee',
              localKey: 'inviteeSocialAccountId'
            }]
          }
        },
        methods: {
          isCurrentUserIssuedInvites: function (ownerAgentId) {
            return this.ownerAgentId === ownerAgentId;
          }
        }
      });

      var fields = [
        {
          key: 'owner.name',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'Owner',
            placeholder: 'Owner',
            disabled: true
          }
        }, {
          key: 'status',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'Status',
            placeholder: 'Status',
            disabled: true
          }
        }, {
          key: 'code',
          id: 'inviteCode',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'Code',
            placeholder: 'Code',
            disabled: true
          }
        }
      ];

      saFormlyConfigService.setConfig('invite', fields);
    })
  ;

}());

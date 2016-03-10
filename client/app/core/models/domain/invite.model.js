'use strict';

(function () {

  angular.module('authApiApp')

    .factory('Invite', function (DS) {
      return DS.defineResource({
        name: 'invite',
        relations: {
          belongsTo: {
            agent: {
              localField: 'owner',
              localKey: 'ownerId'
            },
            inviter: {
              localField: 'inviter',
              localKey: 'inviterId'
            }
          },
          hasOne: {
            counterAgent: {
              localField: 'acceptor',
              localKey: 'acceptorId'
            },
            invitee: {
              localField: 'invitee',
              localKey: 'inviteeId'
            }
          }
        }
      });
    })

    .run(function (Invite, FormlyConfigService) {
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

      FormlyConfigService.setConfig('invite', fields);
    })
  ;

}());

'use strict';

(function () {

  angular.module('debteeApp')

    .run(function (schema) {
      schema.register({
        name: 'account',
        relations: {
          hasMany: {
            ProviderAccount: {
              foreignKey: 'accountId',
              localField: 'providerAccounts'
            },
            OrgAccount: {
              foreignKey: 'accountId',
              localField: 'orgAccounts'
            }
          }
        }
      });
    })
    .run(function (schema, appConfig, saFormlyConfigService) {

      schema.register({
        name: 'providerAccount',
        basePath: appConfig.apiUrl,
        relations: {
          belongsTo: {
            account: {
              localField: 'account',
              localKey: 'accountId'
            }
          }
        }
      });

      schema.register({
        name: 'socialAccount',
        basePath: appConfig.apiUrl,
        relations: {
          hasMany: {
            invite: [
              {
                localField: 'invitees',
                foreignKey: 'inviteeSocialAccountId'
              }, {
                localField: 'inviters',
                foreignKey: 'inviterSocialAccountId'
              }
            ]
          }
        }
      });

      var accountFields = [
        {
          key: 'name',
          type: 'input',
          templateOptions: {
            label: 'Name',
            type: 'text',
            required: true,
            maxlength: 30
          }
        }
      ];

      saFormlyConfigService.setConfig('accountInfo', accountFields);
    });

}());

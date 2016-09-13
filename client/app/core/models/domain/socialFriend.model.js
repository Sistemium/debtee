'use strict';

(function () {

  angular.module('debteeApp')

    .run(function (schema, appConfig) {

      schema.register({
        endpoint: 'api/social/facebook',
        basePath: appConfig.authUrl,
        name: 'facebookFriend',
        relations: {
          hasMany: {
            invite: [{
              localField: 'invites',
              foreignKey: 'inviterSocialAccountId'
            }, {
              localField: 'invitations',
              foreignKey: 'inviteeSocialAccountId'
            }]
          }
        },
        methods: {
          status: function () {
            if (this.invites && this.invites.length === 0 && this.invitations && this.invitations.length === 0) {
              return 'invite';
            } else if (_.find(this.invites, {'status': 'open'}) || _.find(this.invitations, {'status': 'open'})) {
              return 'waiting';
            } else if (_.find(this.invites, {'status': 'accepted'}) || _.find(this.invitations, {'status': 'accepted'})) {
              return 'accepted';
            }
          }
        }
      });
      schema.register({
        endpoint: 'api/social/google',
        basePath: appConfig.authUrl,
        name: 'googleFriend',
        relations: {
          hasMany: {
            invite: [{
              localField: 'invites',
              foreignKey: 'inviterSocialAccountId'
            }, {
              localField: 'invitations',
              foreignKey: 'inviteeSocialAccountId'
            }]
          }
        },
        methods: {
          status: function () {
            if (this.invites && this.invites.length === 0 && this.invitations && this.invitations.length === 0) {
              return 'invite';
            } else if (_.find(this.invites, {'status': 'open'}) || _.find(this.invitations, {'status': 'open'})) {
              return 'waiting';
            } else if (_.find(this.invites, {'status': 'accepted'}) || _.find(this.invitations, {'status': 'accepted'})) {
              return 'accepted';
            }
          }
        }
      });

    })
  ;

}());

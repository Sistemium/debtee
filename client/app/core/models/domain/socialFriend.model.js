'use strict';

(function () {

  angular.module('debteeApp')

    .run(function (schema, appConfig) {
      schema.register({
        endpoint: 'facebook/friend',
        basePath: appConfig.apiUrl,
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
        endpoint: 'google/friend',
        basePath: appConfig.apiUrl,
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
      schema.register({
        name: 'socialFriend',
        relations: {
          hasMany: {
            invite: [{
              localField: 'invites',
              foreignKey: 'inviterSocialAccountId'
            }, {
              localField: 'invitations',
              foreignKey: 'inviteeSocialAccountId'
            }]
          },
          belongsTo: {
            socialAccount: [{
              localField: 'ownerSocialAccount',
              localKey: 'ownerSocialAccountId'
            }]
          }
        }
      });
    })
  ;

}());

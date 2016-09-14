'use strict';

(function () {

  angular.module('debteeApp')
    .controller('FriendsCtrl', function ($scope,
                                         $q,
                                         models,
                                         Auth,
                                         saMessageService,
                                         InitCtrlService,
                                         sabErrorsService) {

      var vm = this;
      var Invite = models.invite;
      var FacebookFriend = models.facebookFriend;
      var GoogleFriend = models.googleFriend;
      var SocialAccount = models.socialAccount;
      vm.currentUserPromise = Auth.getCurrentUser();

      function init() {
        vm.busy = $q(function (resolve, reject) {
          $q.all([FacebookFriend.findAll(), GoogleFriend.findAll(), vm.currentUserPromise]).then(function (res) {

            vm.currentUser = res[2];
            vm.facebookFriends = [];
            vm.googleFriends = [];

            var promises = [];
            _.each(res[0], function (r) {
              //promises.push(FacebookFriend.loadRelations(r).then(function () {
              console.log(r);
              vm.facebookFriends.push(r);
              //}));
            });

            _.each(res[1], function (r) {
              vm.googleFriends.push(r);
            });
            $q.all(promises).then(function () {
              resolve();
            }, function () {
              reject();
            });

          });
        });
      }

      angular.extend(vm, {

        inviteSocialFriend: function (friend, provider) {
          //TODO make it possible to choose provider with which to invite
          let providerAccount = _.find(vm.currentUser.providers, function(i) {
            return i.profileData.provider === provider;
          });
          let inviterId = providerAccount.profileId;

          SocialAccount.findAll({profileId: friend.profileId, provider: provider}).then((inviteeSocialAccount) => {
            SocialAccount.findAll({profileId: inviterId, provider: provider}).then((inviterSocialAccount) => {
              let data = {
                ownerAgentId: vm.agent.id,
                code: null,
                status: null,
                inviteeSocialAccountId: inviteeSocialAccount[0].id,
                inviterSocialAccountId: inviterSocialAccount[0].id
              };

              Invite.create(data).then(function () {
                saMessageService.success('Invite was sent to ' + friend.name, 'Invite sent');
              }, function (err) {
                sabErrorsService.addError(err);
              });
            });

          });

        }

      });

      InitCtrlService.init(vm, $scope);
      init();

    })
  ;

}());

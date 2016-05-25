'use strict';

(function () {

  angular.module('debteeApp')
    .controller('InviteInfoCtrl', function ($scope,
                                            $stateParams,
                                            models,
                                            $state,
                                            saFormlyConfigService,
                                            sabErrorsService) {

      var vm = this;
      var Invite = models.invite;

      vm.busy = Invite.find($stateParams.id).then(function (invite) {
        console.log(invite);
      });

      Invite.bindOne($stateParams.id, $scope, 'vm.data');

      function deleteInvite() {
        vm.busy = Invite.destroy(vm.data.id).then(function () {
          $state.go('debt.main');
        });
      }

      function disableDeleteInvite() {
        return !vm.data || !vm.data.status || vm.data.status === 'accepted';
      }

      angular.extend(vm, {

        copyTarget: '#inviteCode',
        fields: saFormlyConfigService.getConfigFieldsByKey('invite'),
        buttons: [
          {
            name: 'Delete invite',
            disabled: disableDeleteInvite,
            fn: deleteInvite,
            classes: 'pull-right btn btn-warning'
          }
        ],

        // TODO implement sms and email invite
        sms: function () {
          sabErrorsService.addError('Not implemented');
        },

        emailInvite: function () {
          sabErrorsService.addError('Not implemented');
        }

      });
    })
  ;

}());

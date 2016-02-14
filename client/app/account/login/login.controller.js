'use strict';

var LoginController = function (Auth, $state) {

  var me = this;

  me.user = {};
  me.errors = {};
  me.submitted = false;
  me.Auth = Auth;
  me.$state = $state;

  me.login = function () {
    me.submitted = true;

    if (me.user.mobileNumber && !me.smsId) {
      me.Auth.loginWithMobileNumber(me.user.mobileNumber)
        .then(res => {
          console.log (res);
          me.smsId = res.data.ID;
          me.submitted = false;
        })
        .catch(err => {
          me.errors.other = err.message;
        });
    } else if (me.smsId && me.smsCode) {
      me.Auth.authWithSmsCode (me.smsId, me.smsCode).then(function(res){
        if (res.token) {
          $state.go('main', {'access-token': res.token});
        } else {
          me.errors.other = 'Error: got empty token';
        }
      });
    }
  };

};

angular.module('authApiApp')
  .controller('LoginController', LoginController);

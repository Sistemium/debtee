(function () {
  'use strict';

  function AdminController(OrgService, User) {

    let vm = this;
    vm.users = User.query();

    vm.delete = (user) => {
      user.$remove();
      this.users.splice(this.users.indexOf(user), 1);
    };

    OrgService();
  }

  angular.module('debteeApp.admin')
    .controller('AdminController', AdminController);

})();

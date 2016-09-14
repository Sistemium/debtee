'use strict';

(function () {

  angular.module('debteeApp.core.services')
    .factory('InitService', function (models) {

      function init () {
        models.currency.findAll();
        models.agent.findAll();
        models.providerAccount.findAll();
      }

      return {
        init: init
      };

    })
  ;

}());

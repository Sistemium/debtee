(function (ng) {
  'use strict';
  ng.module('debteeApp.admin')
    .service('OrgService', function (schema) {

      return schema().models().org;

    })
  ;

})(angular);

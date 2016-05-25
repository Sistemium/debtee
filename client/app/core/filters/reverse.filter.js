'use strict';

(function () {

  angular.module('debteeApp.core.filters')
    .filter('reverse', function () {
      return function (items) {
        if (!angular.isArray(items)) {
          return false;
        }
        return items.slice().reverse();
      };
    });

}());

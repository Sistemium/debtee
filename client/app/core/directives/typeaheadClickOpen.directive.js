'use strict';

(function () {

  angular.module('debteeApp')
    .directive('typeaheadClickOpen', function ($timeout) {
      return {
        require: 'ngModel',
        link: function($scope, elem) {
          var triggerFunc = function() {
            var ctrl = elem.controller('ngModel'),
              prev = ctrl.$modelValue || '';
            if (prev) {
              ctrl.$setViewValue('');
              $timeout(function() {
                ctrl.$setViewValue(prev);
              });
            } else {
              ctrl.$setViewValue(' ');
            }
          };
          elem.bind('click', triggerFunc);
        }
      };
    });

}());

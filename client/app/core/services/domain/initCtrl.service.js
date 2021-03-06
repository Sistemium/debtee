'use strict';

(function () {

  angular.module('debteeApp.core.services')
    .factory('InitCtrlService', function ($filter, SettingsService, sabNgTable) {

      // var deb = debug('debtee:InitCtrlService');

      function setup(ctrl) {

        return angular.extend(ctrl, {
          setupNgTable: function (model) {
            return sabNgTable.setup (ctrl, model);
          }
        });

      }

      function init(ctrl, scope) {

        ctrl.onSetAgent = ctrl.onSetAgent || function (agent) {
          ctrl.agent = agent;
        };

        function setAgent(o, n) {
          var agent = n || o;
          if (!agent) {
            return;
          }

          ctrl.onSetAgent(agent);
        }

        //watchers
        //scope.$watch('ctrl.searchText', function () {
        //  if (ctrl.ngTable) {
        //    ctrl.ngTableParams.reload();
        //  }
        //});

        scope.$on('current-agent', setAgent);

        setAgent(SettingsService.getCurrentAgent());

      }

      return {
        init: init,
        setup: setup
      };

    })
  ;

}());

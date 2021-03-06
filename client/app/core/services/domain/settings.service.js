'use strict';

(function () {

  angular.module('debteeApp.core.services')
    .factory('SettingsService', function ($timeout, models, $rootScope, localStorageService) {

      var currentAgent;
      var Agent = models.agent;

      function setCurrentAgent(agent) {
        if (!agent) {
          return;
        }
        localStorageService.set ('current-agent-id', agent.id);
        $rootScope.$broadcast('current-agent', currentAgent = agent);
      }

      function getCurrentAgent() {
        return currentAgent;
      }

      function setCurrentAgentOnChange() {
        var agents = Agent.getAll();

        if (!currentAgent || !_.find(agents,{id:currentAgent.id})) {
          var id = localStorageService.get('current-agent-id');
          setCurrentAgent (id && Agent.get(id) || _.head (agents));
        }
      }

      Agent.on('DS.afterInject', function () {
        $timeout(setCurrentAgentOnChange());
      });

      Agent.on('DS.afterDestroy', function () {
        $timeout (setCurrentAgentOnChange);
      });

      return {
        setCurrentAgent: setCurrentAgent,
        getCurrentAgent: getCurrentAgent
      };



    });

}());

'use strict';

(function () {

  angular.module('debteeApp')
    .controller('ContactListCtrl', function ($scope,
                                             $state,
                                             $q,
                                             models,
                                             InitCtrlService) {

      var CounterAgent = models.counterAgent;
      var Agent = models.agent;
      var counterAgentPromise = CounterAgent.findAll();
      var vm = InitCtrlService.setup(this);


      angular.extend(vm, {

        buttons: [{
          name: 'Add a contact',
          sref: 'debt.contact.add'
        }]

      });

      vm.onSetAgent = function (agent) {
        vm.contacts = agent.contacts;
        var agentPromise = Agent.loadRelations(agent, 'contact', {bypassCache: true});

        vm.busy = $q.all([agentPromise, counterAgentPromise]);

        agentPromise.then(function () {
          vm.contacts = agent.contacts;
        });
      };

      InitCtrlService.init(vm, $scope);

    })
  ;

}());

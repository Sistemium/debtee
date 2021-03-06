'use strict';

(function () {

  function OperationAddController($scope,
                                  $q,
                                  models,
                                  InitCtrlService,
                                  saFormlyConfigService,
                                  sabErrorsService) {

    var vm = InitCtrlService.setup(this);
    var Operation = models.operation;
    var CounterAgent = models.counterAgent;
    var Currency = models.currency;
    var Agent = models.agent;

    angular.extend(vm, {

      contacts: [],
      fields: saFormlyConfigService.getConfigFieldsByKey('operationCreate'),
      operation: {},
      options: {},

      data: {
        role: 'debt'
      },

      onCancel: function (form) {
        if (vm.operation.id) {
          Operation.revert(vm.operation.id);
        }
        vm.data = angular.copy(vm.dataPristine);
        if (!vm.data.currencyId) {
          vm.data.currencyId = vm.agent.currencyId;
        }
        form.$setPristine();
      },

      onSubmit: function (form) {


        if (vm.data.role === 'debt') {
          vm.data.debtorId = vm.agent.id;
          vm.data.lenderId = vm.data.contact.counterAgentId;
        } else {
          vm.data.debtorId = vm.data.contact.counterAgentId;
          vm.data.lenderId = vm.agent.id;
        }

        //vm.data.lenderId = null;

        //TODO set default value in STAPI

        angular.extend(vm.operation, {
          total: vm.data.total,
          currencyId: vm.data.currency && vm.data.currency.id || vm.data.currencyId,
          debtorId: vm.data.debtorId,
          lenderId: vm.data.lenderId
        });

        sabErrorsService.clear();

        Operation.create(vm.operation).then(function (res) {
          vm.operation = res;
          form.$setPristine();
          console.log(res);
          vm.dataPristine = angular.copy(vm.data);
        }, function (err) {
          sabErrorsService.addError(err);
        });
      },

      isSaved: function () {
        return !sabErrorsService.errors.length && vm.operation.id;
      },

      onSetAgent: function (agent) {
        vm.busy = Agent.loadRelations(agent).then(function () {
          vm.agent = agent;
          vm.data.currencyId = agent.currencyId;
          vm.data.currency = agent.currency;
        });
      }

    });

    vm.originalFields = angular.copy(vm.fields);
    vm.dataPristine = angular.copy(vm.data);
    vm.counterAgentField = saFormlyConfigService.getConfigKey(vm.fields, 'contact');
    vm.counterAgentField.templateOptions.liveSearch = function (viewValue) {
      return _.filter(vm.agent.contacts, function (c) {
        return _.includes(c.counterAgent.name.toLowerCase(), viewValue.toLowerCase()) || viewValue === ' ';
      });
    };
    vm.counterAgentField.templateOptions.onSelect = function (item) {
      vm.data.contact = item;
    };
    vm.totalField = saFormlyConfigService.getConfigKey(vm.fields, 'total');

    Currency.bindAll(false, $scope, 'vm.totalField.templateOptions.options');

    vm.busy = $q.all([
      CounterAgent.findAll(),
      Currency.findAll()
    ]);

    InitCtrlService.init(vm, $scope);

  }

  angular.module('debteeApp')
    .controller('OperationAddCtrl', OperationAddController);

}());

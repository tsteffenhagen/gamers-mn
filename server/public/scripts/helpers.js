myApp.factory('alert', function($uibModal) {

    function show(action, event) {
      if (action === 'NewEventClicked') {
      return $uibModal.open({
        templateUrl: '/views/modals/newModalContent.html',
        controller: function() {
          var vm = this;
          vm.action = action;
          vm.event = event;
        },
        controllerAs: 'vm'
      });
      } else {
      return $uibModal.open({
        templateUrl: '/views/modals/eventContent.html',
        controller: function() {
          var vm = this;
          vm.action = action;
          vm.event = event;
        },
        controllerAs: 'vm'
      });
    }
    }

    return {
      show: show
    };

  });

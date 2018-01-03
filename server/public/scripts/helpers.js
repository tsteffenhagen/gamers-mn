myApp.factory('alert', function ($uibModal) {

  function show(action, event) {
    if (action === 'NewEventClicked') {
      return $uibModal.open({
        templateUrl: '/views/modals/newGameModal.html',
        controller: function () {
          var vm = this;
          vm.action = action;
          vm.event = event;
        },
        controllerAs: 'vm'
      });
    } else {
      return $uibModal.open({
        templateUrl: '/views/modals/eventContent.html',
        controller: function ($http, $location) {
          var vm = this;


          vm.action = action;


          vm.event = event;
          vm.editDate = function (date) {
            var editedDate = new Date(date)
            console.log(editedDate);

            return new Date(editedDate);
          }
          vm.event.startsAt = vm.editDate(vm.event.startsAt)
          vm.event.endsAt = vm.editDate(vm.event.endsAt)

          vm.editEvent = function (event) {
            console.log(event)

            $http({
              method: 'PUT',
              url: '/events',
              data: event
            }).then(function (response) {
              console.log('response', response);
            })
          };





          vm.deleteEvent = function (dateToRemove) {
            console.log(dateToRemove);

            $http({
              method: 'DELETE',
              url: '/events',
              params: dateToRemove
            }).then(function (response) {
              console.log('response', response);
            })
          }
        },
        controllerAs: 'vm'
      });
    }
  }

  return {
    show: show
  };

});

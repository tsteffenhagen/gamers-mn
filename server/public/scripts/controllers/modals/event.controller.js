myApp.controller('EventController', function(GameService, $http, $location) {
    console.log('EventController created');
    var vm = this;

    vm.action = action
    vm.event = event;

    console.log(event);
    
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
      console.log('delete this ', dateToRemove);

      $http({
        method: 'DELETE',
        url: '/events',
        params: dateToRemove
      }).then(function (response) {
        console.log('response', response);
      })
    }
  });
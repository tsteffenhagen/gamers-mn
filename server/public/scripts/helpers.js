myApp.service('alert', function ($uibModal, $http, $location) {
  
  function show(action, event) {
    if (action === 'NewGameClicked') {
      return $uibModal.open({
        templateUrl: '/views/modals/newGameModal.html',
        controller: 'NewGameController as vm'
      });
    } else if (action === 'NewEventClicked') {
      return $uibModal.open({
        templateUrl: '/views/modals/newEventModal.html',
        controller: 'NewEventController as vm'
      });
    } else if (action === 'HomePageClick') {
      return $uibModal.open({
        templateUrl: '/views/modals/homePageModal.html',
        controller: 'LoginController as vm'
      });
    }  else if (action === 'NewGameCreatorClicked') {
      return $uibModal.open({
        templateUrl: '/views/modals/newGameCreatorModal.html',
        controller: 'NewGameController as vm'
      });
    }  else if (action === 'NewGameTypeClicked') {
      return $uibModal.open({
        templateUrl: '/views/modals/newGameTypeModal.html',
        controller: 'NewGameController as vm'
      });
    }  else {
      return $uibModal.open({
        templateUrl: '/views/modals/eventContent.html',
        controller: function () {
          var vm = this;
          vm.action = action
          vm.event = event;

          vm.userArray = { list: [] }
          console.log(event);

          vm.editDate = function (date) {
            var editedDate = new Date(date)
            console.log(editedDate);

            return new Date(editedDate);
          }
          vm.event.startsAt = vm.editDate(vm.event.startsAt)
          vm.event.endsAt = vm.editDate(vm.event.endsAt)


          vm.getUsers = function () {
            $http({
              method: 'GET',
              url: '/user/userlist'
            }).then(function (response) {
              console.log('response', response);
              vm.userArray.list = response.data;
              console.log(vm.userArray.list);
              
            })
          };
          vm.getUsers();

          vm.inviteUser = function (info) {
            console.log('in inviteUser', info);
            info.inviteId = parseInt(info.inviteId);
            console.log('inviteUser redux', info);
            
            $http({
              method: 'POST',
              url: '/events/invite',
              data: info
            }).then(function (response) {
              console.log('response', response);              
            })            
          };

          vm.editEvent = function (event) {
            $http({
              method: 'PUT',
              url: '/events',
              data: event
            }).then(function (response) {
              console.log('response', response);
            })
          };


          vm.deleteEvent = function (dateToRemove) {
            $http({
              method: 'DELETE',
              url: '/events',
              params: dateToRemove
            }).then(function (response) {
              console.log('response', response);
            })
          };
        },
        controllerAs: 'vm'
      });
    }
  }

  return {
    show: show
  };

});

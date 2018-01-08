myApp.factory('alert', function ($uibModal) {

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
    } else {
      return $uibModal.open({
        templateUrl: '/views/modals/eventContent.html',
        controller: 'EventController as vm'
      });
    }
  }

  return {
    show: show
  };

});

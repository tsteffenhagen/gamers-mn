myApp.controller('LoginController', function ($http, $location, UserService, CalendarService) {
  console.log('LoginController created');
  var vm = this;

  vm.calendarView = 'month';

  vm.viewDate = new Date();

  vm.user = {
    username: '',
    password: ''
  };
  vm.message = '';

  vm.CalendarService = CalendarService;

  vm.CalendarService.getPublicEvents();

  vm.login = function () {
    console.log('LoginController -- login');
    if (vm.user.username === '' || vm.user.password === '') {
      vm.message = "Enter your username and password!";
    } else {
      console.log('LoginController -- login -- sending to server...', vm.user);
      $http.post('/', vm.user).then(function (response) {
        if (response.data.username) {
          console.log('LoginController -- login -- success: ', response.data);
          // location works with SPA (ng-route)
          $location.path('/profile'); // http://localhost:5000/#/user
        } else {
          console.log('LoginController -- login -- failure: ', response);
          vm.message = "Wrong!!";
        }
      }).catch(function (response) {
        console.log('LoginController -- registerUser -- failure: ', response);
        vm.message = "Wrong!!";
      });
    }
  };

  vm.registerUser = function () {
    console.log('LoginController -- registerUser');
    if (vm.user.username === '' || vm.user.password === '') {
      vm.message = "Choose a username and password!";
    } else {
      console.log('LoginController -- registerUser -- sending to server...', vm.user);
      $http.post('/register', vm.user).then(function (response) {
        console.log('LoginController -- registerUser -- success');
        $location.path('/home');
      }).catch(function (response) {
        console.log('LoginController -- registerUser -- error');
        vm.message = "Please try again."
      });
    }
  }

  vm.addNewEvent = function (event) {
    alert.show('NewEventClicked', event);
  };

  var actions = [{
    label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
    onClick: function (args) {
      alert.show('Edited', args.calendarEvent);
    }
  }, {
    label: '<i class=\'glyphicon glyphicon-remove\'></i>',
    onClick: function (args) {
      alert.show('Deleted', args.calendarEvent);
    }
  }];

  vm.cellIsOpen = true;

  vm.eventClicked = function (event) {
    alert.show('Clicked', event);
  };

  vm.eventEdited = function (event) {
    alert.show('Edited', event);
  };

  vm.eventDeleted = function (event) {
    alert.show('Deleted', event);
  };

  vm.eventTimesChanged = function (event) {
    alert.show('Dropped or resized', event);
  };

  vm.toggle = function ($event, field, event) {
    $event.preventDefault();
    $event.stopPropagation();
    event[field] = !event[field];
  };

  vm.timespanClicked = function (date, cell) {

    if (vm.calendarView === 'month') {
      if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
        vm.cellIsOpen = false;
      } else {
        vm.cellIsOpen = true;
        vm.viewDate = date;
      }
    } else if (vm.calendarView === 'year') {
      if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
        vm.cellIsOpen = false;
      } else {
        vm.cellIsOpen = true;
        vm.viewDate = date;
      }
    }

  };

});

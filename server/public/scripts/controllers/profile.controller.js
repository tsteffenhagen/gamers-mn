myApp.controller('ProfileController', function (moment, alert, calendarConfig, CalendarService, GameService, UserService) {

    var vm = this;

    
    vm.CalendarService = CalendarService;
    vm.UserService = UserService;
    vm.calendarView = 'month';
    vm.viewDate = new Date();

    vm.userObject = UserService.userObject
    
    CalendarService.getEvents();
    vm.addEvent = CalendarService.addEvent
    vm.addnewEvent = CalendarService.addnewEvent
    vm.uploadProfilePicture = UserService.uploadProfilePicture;
    vm.addNewGame = function (event) {
        alert.show('NewGameClicked', event);
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

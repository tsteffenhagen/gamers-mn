myApp.controller('KitchenSinkCtrl', ['moment', 'alert', 'calendarConfig', 'CalendarService', 'filterFilter', function (moment, alert, calendarConfig, CalendarService, filterFilter) {


    var vm = this;

    vm.eventSearch = "";

    vm.CalendarService = CalendarService;
    vm.calendarView = 'month';
    vm.viewDate = new Date();

    vm.filteredEvents = []

    CalendarService.getEvents();
    vm.addEvent = CalendarService.addEvent

    //Function for filtering event array
    vm.criteriaChanged = CalendarService.criteriaChanged

    vm.criteriaChanged();


    //Opens Modal for adding a new event
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

}]);

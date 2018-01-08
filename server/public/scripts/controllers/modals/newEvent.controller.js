myApp.controller('NewEventController', function (moment, alert, calendarConfig, CalendarService) {


    var vm = this;


    vm.CalendarService = CalendarService;
    vm.calendarView = 'month';
    vm.viewDate = new Date();

    vm.addNewEvent = CalendarService.addNewEvent


});
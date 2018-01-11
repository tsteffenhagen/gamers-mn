myApp.controller('NewEventController', function (moment, alert, calendarConfig, CalendarService, GameService) {


    var vm = this;


    vm.CalendarService = CalendarService;
    vm.GameService = GameService

    GameService.getGameCollection();

    vm.gameArray = GameService.gameCollectionArray;
    vm.addNewEvent = CalendarService.addNewEvent


});
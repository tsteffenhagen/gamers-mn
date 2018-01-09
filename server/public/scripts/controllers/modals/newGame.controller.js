myApp.controller('NewGameController', function(GameService) {
    console.log('NewGameController created');
    var vm = this;

    vm.GameService = GameService;

    GameService.getGameTypes();
    GameService.getGameCreators();

    vm.gameTypeArray = GameService.gameTypeArray;
    vm.gameCreatorArray = GameService.gameCreatorArray;

    vm.addNewGame = GameService.addNewGame
  });

  
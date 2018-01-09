myApp.controller('GameController', function(GameService, alert) {
    console.log('GameController created');
    var vm = this;

    vm.GameService = GameService;


    GameService.getGames();
    GameService.getGameTypes();
    GameService.getGameCreators();
    GameService.getGameCollection()

    vm.gameArray = GameService.gameArray;
    vm.gameTypeArray = GameService.gameTypeArray;
    vm.gameCreatorArray = GameService.gameCreatorArray;
    vm.gameCollectionArray = GameService.gameCollectionArray;

    vm.addToCollection = GameService.addToCollection

    vm.addNewGame = function (event) {
      alert.show('NewGameClicked', event);
  };


  });
  
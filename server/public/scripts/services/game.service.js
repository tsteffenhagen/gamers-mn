myApp.service('GameService', function ($http, $location) {
    console.log('GameService Loaded');
    var self = this;

    self.gameArray = { list: [] };

    self.gameTypeArray = { list: [] };

    self.gameCreatorArray = { list: [] };

    self.gameCollectionArray = { list: [] };

    self.addNewGame = function () {
        console.log('Button clicked');
    }

    self.getGames = function () {

        $http({
            method: 'GET',
            url: '/games'
        }).then(function (response) {
            console.log('response', response);
            self.gameArray.list = response.data;
        })
        
    }

    self.getGameTypes = function () {

        $http({
            method: 'GET',
            url: '/games/gametype'
        }).then(function (response) {
            console.log('response', response);
            self.gameTypeArray.list = response.data;
        })
        
    }

    self.getGameCreators = function () {

        $http({
            method: 'GET',
            url: '/games/gamecreators'
        }).then(function (response) {
            console.log('response', response);
            self.gameCreatorArray.list = response.data;
        })
        
    }

    self.getGameCollection = function () {
        
        $http({
            method: 'GET',
            url: '/games/gameCollection'
        }).then(function (response) {
            console.log('response', response);
            self.gameCollectionArray.list = response.data;
        })
    }

    self.addNewGame = function (newGame) {
        console.log('in add new game', newGame);

        $http({
            method: 'POST',
            url: '/games',
            data: newGame
        }).then(function (response) {
            console.log('response', response);
            newGame.name = '';
            newGame.gameType = '';
            newGame.gameCreator = '';
            newGame.players = '';
            newGame.duration='';
        })
        self.getGames();
    }

    self.addToCollection = function (game) {
        console.log('game to add', game)

        $http({
            method: 'POST',
            url: '/games/collections',
            data: game
        }).then(function (response) {
            console.log('response', response);            
        })
    }
})
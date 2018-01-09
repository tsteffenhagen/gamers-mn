myApp.service('GameService', function ($http, $location) {
    console.log('GameService Loaded');
    var self = this;

    self.gameTypeArray = { list: [] };

    self.gameCreatorArray = { list: [] };

    self.addNewGame = function () {
        console.log('Button clicked');
    }

    self.getGameTypes = function () {

        $http({
            method: 'GET',
            url: '/games/gametype'
        }).then(function (response) {
            console.log('response', response);
            self.gameTypeArray.list = response.data;
        })
        console.log('IS IT WORKING', self.gameTypeArray);
        
    }

    self.getGameCreators = function () {

        $http({
            method: 'GET',
            url: '/games/gamecreators'
        }).then(function (response) {
            console.log('response', response);
            self.gameCreatorArray.list = response.data;
        })
        console.log('IS IT WORKING MEOW', self.gameCreatorArray);
        
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
    }
})
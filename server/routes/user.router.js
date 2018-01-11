var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');
var path = require('path');
var passport = require('passport');


// Handles Ajax request for user information if user is authenticated
router.get('/', function(req, res) {
  console.log('get /user route');
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in', req.user);
    var userInfo = {
      username : req.user.username
    };
    res.send(userInfo);
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});

// clear all server session information about this user
router.get('/logout', function(req, res) {
  // Use passport's built-in method to log out the user
  console.log('Logged out');
  req.logOut();
  res.sendStatus(200);
});

//GET users
router.get('/userlist', function(req, res) {
  pool.connect(function(errorConnectingToDatabase, client, done) {
    if (errorConnectingToDatabase) {
      console.log('errpr', errorConnectingToDatabase);
      res.sendStatus(500);
          } else {
            client.query(`Select "username", "id" FROM users;`, function(errorMakingDatabaseQuery, result) {
              if (errorMakingDatabaseQuery) {
                console.log('error', errorMakingDatabaseQuery);
                res.sendStatus(500);                
              } else {
                res.send(result.rows);
              }
            })
          }
  })
})




module.exports = router;

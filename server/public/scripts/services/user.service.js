myApp.service('UserService', function ($http, $location) {
  console.log('UserService Loaded');
  var self = this;
  self.userObject = {};
  self.imageUrl = {};
  self.userArray = { list: [] }
  self.getuser = function () {
    console.log('UserService -- getuser');
    $http.get('/user').then(function (response) {
      if (response.data.username) {
        // user has a current session on the server
        self.userObject.userName = response.data.username;
        if (response.data.image_url != null) {
          self.userObject.profilePic = response.data.image_url;
        } else {
          self.userObject.profilePic = '../views/images/a1.jpg';
        }
        console.log('UserService -- getuser -- User Data: ', self.userObject.userName, response.data.image_url);
      } else {
        console.log('UserService -- getuser -- failure');
        // user has no session, bounce them back to the login page
        $location.path("/home");
      }
    }, function (response) {
      console.log('UserService -- getuser -- failure: ', response);
      $location.path("/home");
    });
  },
    self.getUsers = function () {
      $http({
        method: 'GET',
        url: '/user/userlist'
      }).then(function (response) {
        console.log('response', response);
        for (let i = 0; i < response.data.length; i++) {
          vm.userArray.list.push({
            username: response.data[i].username,
            userId: response.data[i].id,
            image_url: response.data[i].image_url
          })
        }

        vm.userArray.list = response.data;
        console.log(vm.userArray.list);

      })
    };

  self.logout = function () {
    console.log('UserService -- logout');
    $http.get('/user/logout').then(function (response) {
      console.log('UserService -- logout -- logged out');
      $location.path("/home");
    });
  }

  self.uploadProfilePicture = function () {
    console.log('uploadProfilePicture')
    var fsClient = filestack.init('AR2OVvMAHTTiTRo7bG05Vz');
    function openPicker() {
      fsClient.pick({
        fromSources: ["local_file_system", "url", "imagesearch", "facebook", "instagram", "googledrive", "dropbox", "evernote", "flickr", "box", "github", "webcam", "video", "audio"],
        maxSize: 102400000,
        maxFiles: 5,
        minFiles: 1,
        imageDim: [400, 250]
      }).then(function (response) {
        // declare this function to handle response
        self.imageUrl.link = response.filesUploaded[0].url;
        console.log('IS THIS EVEN WORKING', self.userObject, self.imageUrl);
        $http({
          method: 'PUT',
          url: '/user/profilePicture',
          data: self.imageUrl
        }).then(function (response) {
          console.log('response', response);
        })
      });
    }
    openPicker();
  }
});

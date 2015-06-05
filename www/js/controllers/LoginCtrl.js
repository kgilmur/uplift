upliftApp.controller('LoginCtrl', ['$scope', '$rootScope',  '$state', '$location', function($scope, $rootScope, $state, $location) {

$scope.path = 'img/tlogo.png';



   $scope.hiddenTab = function(){
    if ($rootScope.currentUser){
      return "ng-show";
    } else {
      return "ng-hide";
    }
  }

  $scope.showTab = function(){
    if ($rootScope.currentUser){
      return "ng-hide";
    } else {
      return "ng-show";
    }
  }


  $scope.fblogin = function(){
    var ref = new Firebase("https://upliftapp.firebaseio.com");

    ref.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        // console.log("Authenticated successfully with Facebook:", authData);
        ref.child('users').child(authData.uid).set({
          uid: authData.uid,
          name: authData.facebook.displayName,
          //email: authData.facebook.email,
          access_token: authData.facebook.accessToken,
          picture: authData.facebook.cachedUserProfile.picture,
          created_at: Firebase.ServerValue.TIMESTAMP
        });

        var auth = ref.getAuth();

          if (auth) {
            // console.log("User " + authData.uid + " is logged in with " + authData.provider);
            $rootScope.currentUser = auth;
            // console.log($rootScope.currentUser)
            $state.go('tab.home', {}, { reload: true });
          } else {
            // console.log("User is logged out");
          }

      }
      }, {
        remember: "sessionOnly"
      }
    );
    }


  $scope.twlogin = function(){
    var ref = new Firebase("https://upliftapp.firebaseio.com");

    ref.authWithOAuthPopup("twitter", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        // console.log("Authenticated successfully with Twitter:", authData);
        user = ref.child('users').child(authData.uid).set({
          uid: authData.uid,
          name: authData.twitter.displayName,
          access_token: authData.twitter.accessToken,
          picture: authData.twitter.cachedUserProfile.profile_image_url,
          created_at: Firebase.ServerValue.TIMESTAMP
        });

      var auth = ref.getAuth();
        // console.log(auth);

      if (auth) {
        // console.log("User " + authData.uid + " is logged in with " + authData.provider);
        $rootScope.currentUser = auth;
        // console.log($rootScope.currentUser)
        $state.go('tab.home', {}, { reload: true });
      } else {
        // console.log("User is logged out");
      }
      }
      }, {
        remember: "sessionOnly"
      }
    );
      // $location.path('tab.home')
      // $state.go('tab.home')
      // $state.go('tab.home'), {}, { reload: true }
      // $state.go('tab.home',{},{location:'replace'});
    };


  $scope.logout = function() {
    var ref = new Firebase("https://upliftapp.firebaseio.com");
      ref.unauth();
      $rootScope.currentUser = false;
      $state.go($state.current, {}, { reload: true });
      // console.log("user is logged out", $rootScope.currentUser)
  }

  $scope.continue = function() {
    $state.go('tab.home');
  }

  $scope.hideLogin = function() {
    if ($rootScope.currentUser){
      return "ng-hide"
    } else {
      return "ng-show";
  }
  }

  $scope.hideLogout = function() {
    if ($rootScope.currentUser){
      return "ng-show"
    } else {
      return "ng-hide";
    }
  }

 }]);
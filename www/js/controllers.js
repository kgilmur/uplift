angular.module('starter.controllers', ['ionic', 'firebase'])


// .controller('LoginCtrl', function($scope) {
// var ref = new Firebase("https://upliftapp.firebaseio.com");



// ref.authWithOAuthPopup("facebook", function(error, authData) {
//   if (error) {
//     console.log("Login Failed!", error);
//   } else {
//     console.log("Authenticated successfully with payload:", authData);

//   }
// }, {
//      remember: "none"
//   }

// );


.controller('LoginCtrl', ['$scope', '$rootScope',  '$state', '$location', function($scope, $rootScope, $state, $location) {

   $scope.hiddenTab = function(){
  // return "ng-hide";
  if ($rootScope.currentUser){
    return "ng-show";
  } else {
    return "ng-hide";
  }
 }

  $scope.showTab = function(){
  // return "ng-hide";
  if ($rootScope.currentUser){
    return "ng-hide";
  } else {
    return "ng-show";
  }
 }

// var currentUser = $rootScope.currentUser;

  $scope.fblogin = function(){
    var ref = new Firebase("https://upliftapp.firebaseio.com");



    ref.authWithOAuthPopup("facebook", function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with Facebook:", authData);

      ref.child('users').child(authData.uid).set({
        uid: authData.uid,
        name: authData.facebook.displayName,
        //email: authData.facebook.email,
        access_token: authData.facebook.accessToken,
        picture: authData.facebook.cachedUserProfile.picture,
        created_at: Firebase.ServerValue.TIMESTAMP
      });

      // $state.go('/home');
      var auth = ref.getAuth();
      // console.log(auth);

      if (auth) {
      console.log("User " + authData.uid + " is logged in with " + authData.provider);
      $rootScope.currentUser = auth;
      // console.log($rootScope.currentUser)
      $state.go('tab.home', {}, { reload: true });
      } else {
      console.log("User is logged out");
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
      console.log("User " + authData.uid + " is logged in with " + authData.provider);
      $rootScope.currentUser = auth;
      // console.log($rootScope.currentUser)
      $state.go('tab.home', {}, { reload: true });
      } else {
      console.log("User is logged out");
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
      console.log("user is logged out", $rootScope.currentUser)
    }

  $scope.hideLogin = function() {
    if ($rootScope.currentUser){
      return "ng-hide"
  } else {
    return "ng-show";
  }
  // $state.go($state.current, {}, { reload: true });
  }

  $scope.hideLogout = function() {
    if ($rootScope.currentUser){
      return "ng-show"
  } else {
    return "ng-hide";
  }
  // $state.go($state.current, {}, { reload: true });
  }

 }])




.controller('NewCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
  // console.log("New Controller initialized");
  // console.log($rootScope.currentUser);
  // console.log($scope);
  var ref = new Firebase("https://upliftapp.firebaseio.com/");
  $scope.createPost = function(term) {
    // console.log(term);
    // console.log($rootScope.currentUser);
    console.log("TEST", $rootScope.currentUser);
    if ($rootScope.currentUser != undefined) {
    var postsRef = ref.child("posts");
      postsRef.push({
        'body': term,
        'created_at': Firebase.ServerValue.TIMESTAMP,
        'user_id': $rootScope.currentUser.uid
      });

   } else {
        var postsRef = ref.child("posts");
      postsRef.push({
        'body': term,
        'created_at': Firebase.ServerValue.TIMESTAMP,

      });
    }
    document.newform.reset();
   }
}])




.controller("HomeCtrl", ["$scope", '$state', function($scope, Posts, $state, $cordovaSocialSharing) {

$scope.shareAnywhere = function(post){
  // console.log("SHARE", post.body)
  $cordovaSocialSharing.share(post.body, "Check out this post from Uplift!", null, null);
}

// $scope.shareViaTwitter = function() {
//     $cordovaSocialSharing.shareViaTwitter("Check out the posts on Uplift App for " + device.platform, null, device.platform == "Android" ? "GOOGLE_PLAY_URL" : "ITUNES_URL");
// }

var ref = new Firebase("https://upliftapp.firebaseio.com/posts");
ref.on("value", function(snapshot) {
  // console.log(snapshot.val());
  // $scope.posts = snapshot.val();
  // console.log($scope.posts);
var query = ref.orderByChild('created_at')
query.on('value', function(snap) {
  var results = [];
  snap.forEach(function(ss) {
    results.push(ss.val());
  });

  var reverseResults = results.reverse();
  // console.log(reverseResults);
  $scope.posts = reverseResults;
  console.log($scope.posts)

//   $scope.created_at = new Date();
// console.log("DATE!", $scope.created_at)
});


}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

// $scope.post = { url: 'http://', title: '', timestamp:
// Firebase.ServerValue.TIMESTAMP };

// $state.go('tab.home', {}, { reload: true });



}])




.controller('ProfileCtrl', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {

 //   $scope.hiddenProfileTab = function(){
 //  // return "ng-hide";
 //  if ($rootScope.currentUser){
 //    return "ng-show";
 //  } else {
 //    return "ng-hide";
 //  }
 // }

 //    $scope.showProfileTab = function(){
 //  // return "ng-hide";
 //  if ($rootScope.currentUser){
 //    return "ng-hide";
 //  } else {
 //    return "ng-show";
 //  }
 // }


// new Firebase("https://upliftapp.firebaseio.com/posts")
//     .startAt($rootScope.currentUser.uid)
//     .endAt($rootScope.currentUser.uid)
//     .once('value', function(snap) {
//   var results = [];
//   snap.forEach(function(ss) {
//     results.push(ss.val());
//   });

//   var reverseResults = results.reverse();
//   // console.log(reverseResults);
//   $scope.personalposts = reverseResults;
//   console.log($scope.personalposts)
// });
// console.log("ProfileCtrl")


var ref = new Firebase("https://upliftapp.firebaseio.com/posts");

// console.log(ref);
var query = ref.orderByChild('created_at')

// Get results in ascending (result) and descending (reverseResults) order
var results = [];
var newresults = [];
query.on('value', function(snap) {
  snap.forEach(function(ss) {
    results.push(ss.val());
    // console.log("results", results);
  });
return results;
})
// console.log("results!", results)
for (var i = 0; i < results.length; i++) {
// console.log("rootscope!", $rootScope.currentUser)
if (results[i].user_id && results[i].user_id == ($rootScope.currentUser.uid)) {
   newresults.push(results[i])
   newresults.reverse();
  $scope.personalposts = newresults;

  // console.log("HEY", newresults)
    // $scope.created_at = new Date();


}

}

$scope.delete = function(index) {
    var newVar = newresults[index].created_at;
    var  postRef = new Firebase("https://upliftapp.firebaseio.com/posts/")
    // .once('value', function(snap) {
    //   console.log('HERE', snap.val());
    // })

// postRef.on('child_added', function (snap) {
//     snap.ref()
//     console.log(snap.val());

// });

ref.orderByChild("created_at").equalTo(newVar).on("child_added", function(snapshot) {
  var removeMe = new Firebase("https://upliftapp.firebaseio.com/posts/" + snapshot.key())
  removeMe.remove();
 // console.log(snapshot.key());
});
$state.go($state.current, {}, { reload: true });
    // var newRef = testRef.child(newresults[index].created_at);

// fb.child($scope.post.body).once('value', function(userSnap) {
//    fb.child('media/123').once('value', function(mediaSnap) {
//        // extend function: https://gist.github.com/katowulf/6598238
//        console.log( extend({}, userSnap.val(), mediaSnap.val()) );
//    });
// });
//     console.log($scope.post.id)
// var Path = "https://upliftapp.firebaseio.com/posts" + authData.uid + "/accounts/" + account.title
    // $scope.removeUser(newRef);
}
// console.log("Results", results)
//   // console.log("HEY!", results[i].user_id);
//   // console.log("help", results[i].user_id);
//   // console.log("SCOPE!", $rootScope.currentUser)
// // $scope.profilediv = false;
//   if (results[i].user_id && results[i].user_id == ($rootScope.currentUser.uid)) {
//     // console.log("Worked")
//     newresults.push(results[i])
//   var reverseResults = newresults.reverse();
//   // console.log("HEY!", reverseResults);
// } else {
//   //ADD DIV NO POSTS YET
// }
//   } else {
//     // console.log("error!!!");
//     // $scope.profilediv = true;

//   }


// };

// ref.on("value", function(snapshot) {
// console.log($rootScope.currentUser);
// var query = ref.orderByChild('user_id').equalTo($rootScope.currentUser.uid).on('child_added')

// console.log(query);

// query.once('value', function(snap) {
//   var results = [];
//   snap.forEach(function(ss) {
//     results.push(ss.val());
//   });

//   var reverseResults = results.reverse();
//   // console.log(reverseResults);
//   $scope.personalposts = reverseResults;
//   console.log($scope.personalposts)
// });


// // }, function (errorObject) {
// //   console.log("The read failed: " + errorObject.code);
// });



}]);

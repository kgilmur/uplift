upliftApp.controller('NewCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {

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

}]);
upliftApp.controller("HomeCtrl", ["$scope", '$state', function($scope, Posts, $state, $cordovaSocialSharing) {

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
        // console.log($scope.posts)
        //   $scope.created_at = new Date();
        // console.log("DATE!", $scope.created_at)
      });


    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });

// $scope.post = { url: 'http://', title: '', timestamp:
// Firebase.ServerValue.TIMESTAMP };


}]);
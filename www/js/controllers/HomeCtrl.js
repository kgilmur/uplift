upliftApp.controller("HomeCtrl", ['$ionicPlatform', '$scope', '$cordovaSocialSharing', '$state', function($ionicPlatform, $scope, $cordovaSocialSharing, Posts, $state) {

  $scope.shareAnywhere = function(){
    $ionicPlatform.ready(function() {
    console.log("ran");
    $scope.$evalAsync(function(){
      $cordovaSocialSharing.share("test", "Check out this post from Uplift!", null, "http://www.google.com");
    })
  })
}




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

// $state.go('tab.home', {}, { reload: true });


}]);
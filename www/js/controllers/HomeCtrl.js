upliftApp.controller("HomeCtrl", ['$ionicPlatform', '$scope', '$cordovaSocialSharing', '$state', function($ionicPlatform, $scope, $cordovaSocialSharing, Posts, $state) {

  $scope.shareAnywhere = function(post){
    $ionicPlatform.ready(function() {
      $scope.$evalAsync(function(){
        $cordovaSocialSharing.share(post.body, "Check Out This Post From Uplift!", '../img/tlogo.png', null);
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
        // $state.go('tab.home', {}, { reload: false });
      });


    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });



}]);
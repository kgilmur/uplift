upliftApp.controller('ProfileCtrl', ['$scope', '$rootScope', '$state', '$ionicPlatform', '$cordovaSocialSharing', '$ionicPopup', function($scope, $rootScope, $state, $ionicPlatform, $cordovaSocialSharing, $ionicPopup) {

  $scope.shareAnywhere = function(personalpost){
    $ionicPlatform.ready(function() {
      $scope.$evalAsync(function(){
        $cordovaSocialSharing.share(personalpost.body, "Check Out This Post From Uplift!", '../img/tlogo.png', null);
      })
    })
  }

  var ref = new Firebase("https://upliftapp.firebaseio.com/posts");
  var query = ref.orderByChild('created_at')
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
      // console.log("HEY!", newresults)

      // $scope.created_at = new Date();
    }

    }






  $scope.delete = function(index) {
    var newVar = newresults[index].created_at;
    var  postRef = new Firebase("https://upliftapp.firebaseio.com/posts/")

    ref.orderByChild("created_at").equalTo(newVar).on("child_added", function(snapshot) {
      var removeMe = new Firebase("https://upliftapp.firebaseio.com/posts/" + snapshot.key())
      removeMe.remove();
      // console.log(snapshot.key());
    });
    $state.go($state.current, {}, { reload: true });
}



}]);

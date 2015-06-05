upliftApp.controller('NewCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {



  var quotes = ["A life lived of choice is a life of conscious action. A life lived of chance is a life of unconscious creation.     - Neale Donald Walsch",
  "Glorify who you are today, do not condemn who you were yesterday, and dream of who you can be tomorrow.     - Neale Donald Walsch",
  "Because we believe that our ethnic group, our society, our political party, our God, is better than your God, we kill each other.     - Neale Donald Walsch",
  "Miracles seldom occur in the lives of those who do not consider them possible.     - Neale Donald Walsch",
  "Go ahead and do what you really love to do! Do nothing else! You have so little time. How can you think of wasting a moment doing something for a living you don’t like to do? What kind of a living is that? That is not a living, that is a dying!     - Neale Donald Walsch",
  "Your mind is right now filled with old thoughts. Not only old thoughts, but mostly someone else’s old thoughts. It’s important now, it’s time now, to change your mind about some things. This is what evolution is all about.     - Neale Donald Walsch",
  "Begin to see yourself as a soul with a body rather than a body with a soul.     - Wayne W. Dyer",
  "Doing what you love is the cornerstone of having abundance in your life.     - Wayne W. Dyer",
  "Everything you are against weakens you. Everything you are for empowers you.     - Wayne W. Dyer",
  "If you change the way you look at things, the things you look at change.     - Wayne W. Dyer",
  "Love is the ability and willingness to allow those that you care for to be what they choose for themselves without any insistence that they satisfy you.     - Wayne W. Dyer",
  "When you judge another, you do not define them, you define yourself.     - Wayne W. Dyer",
  "You'll see it when you believe it.     - Wayne W. Dyer",
  "Be at least as interested in what goes on inside you as what happens outside. If you get the inside right, the outside will fall into place.     - Eckhart Tolle",
  "Change is not stressful. Resistance to change creates stress.     - Gary Zukav",
  "Try to be a rainbow in someone's cloud.     - Maya Angelou",
  "Live your beliefs and you can turn the world around.     - Henry David Thoreau",
  "What lies behind you and what lies in front of you, pales in comparison to what lies inside of you.     - Ralph Waldo Emerson",
  "How wonderful it is that nobody need wait a single moment before starting to improve the world.     - Anne Frank",
  "Most people treat the present moment as if it were an obstacle that they need to overcome. Since the present moment is Life itself, it is an insane way to live.     - Eckhart Tolle",
  "Each person comes into this world with a specific destiny--he has something to fulfill, some message has to be delivered, some work has to be completed. You are not here accidentally -you are here meaningfully. There is a purpose behind you. The whole intends to do something through you.     - Osho",
  "All attack is a call for help.     - Neale Donald Walsch",
  "There is only one reason to do anything: as a statement to the universe of Who You Are.     - Neale Donald Walsch",
  "If you want the best the world has to offer, offer the world your best.     - Neale Donald Walsch",
  "Connections are made with the heart, not the tongue    ― C. JoyBell C.",
  "Be kind whenever possible. It is always possible.     – The 14th Dalai Lama",
  ]
 $scope.quotes = quotes[Math.floor(Math.random() * quotes.length)];


  $scope.createPost = function(term) {
    var ref = new Firebase("https://upliftapp.firebaseio.com/");
    // console.log(term);
    // console.log($rootScope.currentUser);
    // console.log("TEST", $rootScope.currentUser);
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
        $scope.quotes = quotes[Math.floor(Math.random() * quotes.length)];
        // console.log("Quotes!", $scope.quotes);
   }

}]);
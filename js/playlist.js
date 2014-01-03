var app = angular.module('playlist', [
  'ngAnimate'
]).controller('PlaylistCtrl', function($scope, $timeout) {


  var dot = function(track, score, interval){
    return function(){
      interval = interval || 1000;
      track.score += 1;

      if(score == 1){
      }
      else {
        console.log('calling next');

        // Recursive call is recursive
        $timeout(dot(track, score-1, interval), 1000);
      }
    }
  }

  $scope.playlist = [
    {id: 123, title: "Fade Away", artist: "Vitalic", score: 4},
    {id: 456, title: "I Love It", artist: "Hilltop Hoods ft. Sia", score: 9},
    {id: 789, title: "Knights of Cydonia (Gramatik Remix)", artist: "Muse", score: 6}
  ];

  // 'playlist' or 'searchResults'
  $scope.currentDisplay = 'playlist';

  $scope.isPlaylist = function(){
    return $scope.currentDisplay == 'playlist';
  }

  $scope.voteButtonText = function(){
    if( $scope.isPlaylist() ){
      return '+1';
    }
    else {
      return 'Ajouter';
    }
  };

  $scope.vote = function(track){
    console.log('calling dot');
    dot(track, 10, 1000)();
  };

});
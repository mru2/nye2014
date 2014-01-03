function PlaylistCtrl($scope) {

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
    track.score += 1;
  };

}
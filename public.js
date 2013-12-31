var allTracks = [];

$(document).ready(onReady);

DZ.init({
  appId  : '129845',
  channelUrl : '/channel'
});

function vote(trackId){
  var track = allTracks[trackId];
  console.log('voting for', track);
  $.get('/api/vote', {track_id: trackId, title: track.title, artist: track.artist}, function(res){
    // window.location.href = window.location.href; // reloading
  });
}

function appendTrack(cont, track_id, title, artist, score){

  // Store the track for data when voting
  allTracks[track_id] = {title: title, artist: artist}

  var trackDom = '<li onclick=vote(' + track_id + ');>';

  trackDom += '<em>' + artist + '</em>' + ' '
  trackDom += '<strong>' + title + '</strong>' + ' '

  if(score !== undefined){
    trackDom += '<span>' + score + '</span>';
  }

  trackDom += '</li>';

  cont.append(trackDom);

}

function onReady(){
  var $results = $('#results');

  $results.html("Loading...");

  // TODO : optimize : store the data in redis directly

  $.getJSON('/api/top', function(res){
    console.log('top tracks', res);

    $results.html("");

    for (var i = 0; i < res.length; i++) {

      var track = res[i];
      appendTrack($results, track.id, track.title, track.artist, track.score);

    }
  });

  $("#searchForm").on('submit', function(e){
    e.preventDefault();

    $results.html("Searching...");
    allTracks = [];

    var query = $("#search").val();

    console.log('searching for', query);

    DZ.api('/search', 'GET', {q: query, order: 'RANKING'}, function(res){
      console.log('got response : ', res);

      $results.html("");

      $.each(res.data, function(index, track){

        if(track.readable && track.type === "track"){
          appendTrack($results, track.id, track.title, track.artist.name);
        }

      });
    });

  });

}
/* global juke */
'use strict';


juke.factory('StatsFactory', function ($q) {
  var statsObj = {};
  statsObj.totalTime = function (album) {
    var audio = document.createElement('audio');
    return $q(function (resolve, reject) {
      var sum = 0;
      var n = 0;
      function resolveOrRecur () {
        if (n >= album.songs.length) resolve(sum);
        else audio.src = album.songs[n++].audioUrl;
      }
      audio.addEventListener('loadedmetadata', function () {
        sum += audio.duration;
        resolveOrRecur();
      });
      resolveOrRecur();
    });
  };
  return statsObj;
});

juke.controller('Albums',function($scope,AlbumFactory){

   AlbumFactory.fetchAll()
  .then(function(albums){
    $scope.albums = albums.data;
  });

  AlbumFactory.fetchById(2)
  .then(function(album){
  })
})


juke.controller('AlbumCtrl', function ($scope, $http, $rootScope, $log, AlbumFactory, StatsFactory, PlayerFactory) {
  var audio = document.createElement('audio');
  // load our initial data
  $http.get('/api/albums/')
  .then(function (res) { return res.data; })
  .then(function (albums) {
    return $http.get('/api/albums/' + albums[0].id); // temp: get one
  })
  .then(function (res) { return res.data; })
  .then(function (album) {
    album.imageUrl = '/api/albums/' + album.id + '/image';
    album.songs.forEach(function (song, i) {
      song.audioUrl = '/api/songs/' + song.id + '/audio';
      song.albumIndex = i;
    });
    $scope.album = album;
   StatsFactory.totalTime(album)
   .then(function(albumDuration){
      $scope.fullDuration = Math.round(albumDuration / 60) + " minutes";

   })
  })
  .catch($log.error); // $log service can be turned on and off; also, pre-bound

  // main toggle
  // $scope.toggle = function (song) {
  //   if ($scope.playing && song === $scope.currentSong) {
  //     $rootScope.$broadcast('pause');
  //   } else {
  //     $rootScope.$broadcast('play', song);
  //   }
  // };

  // incoming events (from Player, toggle, or skip)
  // $scope.$on('pause', pause);
  // $scope.$on('play', play);
  // $scope.$on('next', next);
  // $scope.$on('prev', prev);

  // functionality
  // function pause () {
  //   $scope.playing = false;
  // }
  // function play (event, song) {
  //   $scope.playing = true;
  //   $scope.currentSong = song;
  // }

  // a "true" modulo that wraps negative to the top of the range
  function mod (num, m) { return ((num % m) + m) % m; }

  // jump `interval` spots in album (negative to go back, default +1)
  // function skip (interval) {
  //   if (!$scope.currentSong) return;
  //   var index = $scope.currentSong.albumIndex;
  //   index = mod( (index + (interval || 1)), $scope.album.songs.length );
  //   $scope.currentSong = $scope.album.songs[index];
  //   if ($scope.playing) $rootScope.$broadcast('play', $scope.currentSong);
  // }
  function next () { skip(1); }
  function prev () { skip(-1); }

$scope.playing = function(){
  return PlayerFactory.isPlaying();
}
$scope.currentSong = function(){
  return PlayerFactory.getCurrentSong();
}
 $scope.play = function(song,songList){
   // $scope.playing() = true;
  if ($scope.currentSong() === song){
    return PlayerFactory.resume();
  }else{
    // $scope.currentSong = song;
  return PlayerFactory.start(song,songList);
  }

 }

 $scope.pause = function(){
  console.log('here');
  // $scope.playing() = false;
  return PlayerFactory.pause();
 }

  $scope.toggle = function (song,songList) {
    PlayerFactory.playlist = songList;
    console.log('playing', $scope.playing());
    if ($scope.playing() && song === $scope.currentSong()) {
      return $scope.pause();
    } else {

      return $scope.play(song,songList);
    }
  };
});




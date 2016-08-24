/* global juke */
'use strict';

juke.controller('PlayerCtrl', function($scope, $rootScope, PlayerFactory) {

    // initialize audio player (note this kind of DOM stuff is odd for Angular)
    // var audio = document.createElement('audio');
    // audio.addEventListener('ended', function () {
    //   $scope.next();
    //   // $scope.$apply(); // triggers $rootScope.$digest, which hits other scopes
    //   $scope.$evalAsync(); // likely best, schedules digest if none happening
    // });
    // audio.addEventListener('timeupdate', function () {
    //   $scope.progress = 100 * audio.currentTime / audio.duration;
    //   // $scope.$digest(); // re-computes current template only (this scope)
    //   $scope.$evalAsync(); // likely best, schedules digest if none happening
    // });

    // state
    // $scope.currentSong;
    // $scope.playing = false;

    // main toggle
    // $scope.toggle = function (song) {
    //   if ($scope.playing) $rootScope.$broadcast('pause');
    //   else $rootScope.$broadcast('PlayerFactory.start', song);
    // };

    // incoming events (from Album or toggle)
    // $scope.$on('pause', pause);
    // $scope.$on('play', PlayerFactory.start);

    // functionality
    // function pause() {
    //     audio.pause();
    //     $scope.playing = false;
    // }

    // function play (event, song){
    //   // stop existing audio (e.g. other song) in any case
    //   pause();
    //   $scope.playing = true;
    //   // resume current song
    //   if (song === $scope.currentSong) return audio.play();
    //   // enable loading new song
    //   $scope.currentSong = song;
    //   audio.src = song.audioUrl;
    //   audio.load();
    //   audio.play();
    // }

    // outgoing events (to Album… or potentially other characters)
    // $scope.next = function () { pause(); $rootScope.$broadcast('next'); };
    // $scope.prev = function () { pause(); $rootScope.$broadcast('prev'); };

    // function seek (decimal) {
    //   audio.currentTime = audio.duration * decimal;
    // }

    // $scope.handleProgressClick = function (evt) {
    //   seek(evt.offsetX / evt.currentTarget.scrollWidth);
    // };
    //PlayerFactory.start();
    $scope.playing = PlayerFactory.isPlaying;

    $scope.currentSong = PlayerFactory.getCurrentSong;

    $scope.play = function(song,songList) {



        //$scope.playing = true;
        if ($scope.currentSong() === song) {
            return PlayerFactory.resume();
        } else {
            //$scope.currentSong() = song;
            return PlayerFactory.start(song);
        }

    }

    $scope.pause = function() {
        //$scope.playing = false;
        return PlayerFactory.pause();
    }
    $scope.toggle = function (song) {

    if ($scope.playing() && song === $scope.currentSong()) {

      return $scope.pause();
    } else {

      return $scope.play(song);
    }
  };

    $scope.next = function(){
      return PlayerFactory.next();
   }

   $scope.prev = function(){
    return PlayerFactory.previous();
   }

   $scope.progress = function(){
    return  PlayerFactory.getProgress();
   }
});

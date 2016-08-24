'use strict';
// var progress;
//   audio.addEventListener('timeupdate', function () {
//     progress = 100 * audio.currentTime / audio.duration;
//     // $scope.$digest(); // re-computes current template only (this scope)
//   });

juke.factory('PlayerFactory', function($http, $rootScope) {
    var audio = document.createElement('audio');
    var songPlaying = false,
        currentSong, currentIndex, playlist, currentTime, progress = 0;

    audio.addEventListener('timeupdate', function() {
        progress = audio.currentTime / audio.duration;
        $rootScope.$evalAsync();
    });
    var retObj = {

        start: function(song, songList) {
            if (songPlaying) {
                this.pause();
            }
            songPlaying = true;
            audio.src = song.audioUrl;
            audio.load();
            audio.play();
            currentSong = song;
            if (songList) {
                playlist = songList;
                currentIndex = songList.indexOf(song);
            }


        },
        pause: function() {
            songPlaying = false;
            audio.pause();
        },
        resume: function() {
            audio.play();
            songPlaying = true;
        },
        isPlaying: function() {
            return songPlaying;
        },
        getCurrentSong: function() {
            if (!currentSong) return null;
            return currentSong;

        },

        next: function() {
            if (currentIndex === playlist.length - 1) {
                currentIndex = 0;
            } else {
                currentIndex += 1;
            }
            var nextSong = playlist[currentIndex];
            this.start(nextSong);

        },

        previous: function() {
            if (currentIndex === 0) {
                currentIndex = playlist.length - 1;
            } else {
                currentIndex -= 1;
            }
            var nextSong = playlist[currentIndex];
            this.start(nextSong);

        },

        getProgress: function() {
            console.log(progress);
            return progress;
        }







    }
    return retObj;
});

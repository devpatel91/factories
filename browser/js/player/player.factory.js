'use strict';
var audio = document.createElement('audio');
juke.factory('PlayerFactory', function($http) {
    var songPlaying = false;
    var retObj = {

        start: function(song) {
            if (songPlaying) {
                this.pause();
            }
            audio.src = song.audioUrl;
            audio.load();
            audio.play();
            songPlaying = true;


        },
        pause: function() {
            audio.pause();
            songPlaying = false;
        },
        resume: function(){
        	audio.play();
        	songPlaying = true;
        },
        isPlaying : function(){
        	return songPlaying;
        },
        getCurrentSong: function(){

        	if(songPlaying || !songPlaying){
        	return  this.song;
        	}else{
        		return null;
        	} 
        	
        }





    }
    return retObj;
});

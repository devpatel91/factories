juke.factory('AlbumFactory', function($http){
  var retObj = {
    fetchAll: function(){
      return $http.get('/api/albums');
    },
    fetchById: function(){
      return $http.get('/api/albumId');
    }
  }

  return retObj;
})

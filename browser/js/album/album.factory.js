juke.factory('AlbumFactory', function($http){
  var retObj = {
    fetchAll: function(){
      return $http.get('/api/albums');
    },
    fetchById: function(id){
      return $http.get('/api/albums/'  + id);
    }
  }

  return retObj;
})

(function () {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    function FlickrService($http) {
        var api = {
            searchPhotos : searchPhotos
        };

        return api;

        function searchPhotos(searchTerm) {
            var key = "b3bd887479c50d8129ec808d6d843d56";
            var secret = "2f1a6b565e004ef5";
            var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search" +
                "&format=json&api_key=API_KEY&text=TEXT";

            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();

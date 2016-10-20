(function () {

    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {

        var websites = [
            { _id: 123, name: "Facebook",    developerId: 456 , description: "I am facebook!"},
            { _id: 234, name: "Tweeter",     developerId: 456, description: "I am tweeter!" },
            { _id: 456, name: "Gizmodo",     developerId: 456, description: "I am gizmdo!" },
            { _id: 567, name: "Tic Tac Toe", developerId: 123, description: "I am tic tac toe!" },
            { _id: 678, name: "Checkers",    developerId: 123, description: "I am checkers!" },
            { _id: 789, name: "Chess",       developerId: 234, description: "I am chess!" }
        ];

        var api = {
            createWebsite : createWebsite,
            findWebsitesByUser : findWebsitesByUser,
            findWebsiteById : findWebsiteById,
            updateWebsite : updateWebsite,
            deleteWebsite : deleteWebsite
        };
        
        return api;
        
        function createWebsite(userId, website) {
            var id = null;
            while (id == null) {
                id = createId();
                for (var w in websites) {
                    if (websites[w]._id === id) {
                        id = null;
                        break;
                    }
                }
            }
            website._id = id;
            website.developerId = userId;
            websites.push(website);

            function createId() {
                var id = Math.floor((Math.random() * 100));
                return id;
            }
        }

        function findWebsitesByUser(userId) {
            var userWebsites = [];
            for (var w in websites) {
                if (websites[w].developerId === userId) {
                    userWebsites.push(websites[w]);
                }
            }
            return userWebsites;
        }

        function findWebsiteById(websiteId) {
            for (var w in websites) {
                if (websites[w]._id === websiteId) {
                    return websites[w];
                }
            }
            return null;
        }

        function updateWebsite(websiteId, website) {
            for (var i = 0; i < websites.length; i++) {
                if (websites[i]._id === websiteId) {
                    websites[i] = website;
                    break;
                }
            }
        }

        function deleteWebsite(websiteId) {
            for (var i = 0; i < websites.length; i++) {
                if (websites[i]._id === websiteId) {
                    websites.splice(i, 1);
                    break;
                }
            }
        }

    }

})();

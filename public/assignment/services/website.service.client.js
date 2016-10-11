(function () {

    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {

        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
            { "_id": "678", "name": "Checkers",    "developerId": "123" },
            { "_id": "789", "name": "Chess",       "developerId": "234" }
        ];

        var api = {
            "createWebsite" : "createWebsite",
            "findWebsitesByUser" : "findWebsitesByUser",
            "findWebsiteById" : "findWebsiteById",
            "updateWebsite" : "updateWebsite",
            "deleteWebsite" : "deleteWebsite"
        };
        
        return api;
        
        function createWebsite(userId, website) {
            website.developerId = userId;
            websites.push(website);

        }

        function findWebsitesByUser(userId) {
            for (var w in websites) {
                if (w.developerId == userId) {
                    return w;
                }
            }

        }

        function findWebsiteById(websiteId) {
            for (var w in websites) {
                if (w._id == websiteId) {
                    return w;
                }
            }

        }

        function updateWebsite(websiteId, website) {
            for (var i = 0; i < websites.length; i++) {
                if (websites[i]._id == websiteId) {
                    websites[i] = website;
                    break;
                }
            }

        }

        function deleteWebsite(websiteId) {
            for (var i = 0; i < websites.length; i++) {
                if (websites[i]._id = websiteId) {
                    websites.slice(i, 1);
                    break;
                }
            }
        }

    }

})();

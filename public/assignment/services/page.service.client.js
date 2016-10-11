(function () {

    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {

        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456" },
            { "_id": "432", "name": "Post 2", "websiteId": "456" },
            { "_id": "543", "name": "Post 3", "websiteId": "456" }
        ];

        var api = {
            "createPage" : "createPage",
            "findPageByWebsiteId" : "findPageByWebsiteId",
            "findPageById" : "findPageById",
            "updatePage" : "updatePage",
            "deletePage" : "deletePage"
        }

        return api;

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            pages.push(page);

        }

        function findPageByWebsiteId(websiteId) {
            for (var p in pages) {
                if (p.websiteId == websiteId) {
                    return p;
                }
            }
        }

        function findPageById(pageId) {
            for (var p in pages) {
                if (p._id == pageId) {
                    return p;
                }
            }

        }

        function updatePage(pageId, page) {

            for (var i = 0; i < pages.length; i++) {
                if (pages[i]._id == pageId) {
                    pages[i] = page;
                    break;
                }
            }

        }

        function deletePage(pageId) {
            for (var i = 0; i < pages.length; i++) {
                if (pages[i]._id == pageId) {
                    pages.slice(i, 1);
                    break;
                }
            }

        }

    }

})();

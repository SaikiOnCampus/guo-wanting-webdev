(function () {

    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {

        var pages = [
            { _id: 321, name: "Post 1", websiteId: 456 },
            { _id: 432, name: "Post 2", websiteId: 456 },
            { _id: 543, name: "Post 3", websiteId: 456 }
        ];

        var api = {
            createPage : createPage,
            findPagesByWebsiteId : findPagesByWebsiteId,
            findPageById : findPageById,
            updatePage : updatePage,
            deletePage : deletePage
        }

        return api;

        function createPage(websiteId, page) {
            var id = null;
            while (id === null) {
                id = createId();
                for (var p in pages) {
                    if (pages[p]._id === id) {
                        id = null;
                        break;
                    }
                }
            }

            page._id = id;
            page.websiteId = websiteId;
            pages.push(page);

            function createId() {
                var id = Math.floor((Math.random() * 100));
                return id;
            }
        }

        function findPagesByWebsiteId(websiteId) {
            var websitePages = [];
            for (var p in pages) {
                if (pages[p].websiteId === websiteId) {
                    websitePages.push(pages[p]);
                }
            }
            return websitePages;
        }

        function findPageById(pageId) {
            for (var p in pages) {
                if (pages[p]._id === pageId) {
                    return pages[p];
                }
            }
            return null
        }

        function updatePage(pageId, page) {

            for (var i = 0; i < pages.length; i++) {
                if (pages[i]._id === pageId) {
                    pages[i] = page;
                    break;
                }
            }
        }

        function deletePage(pageId) {
            for (var i = 0; i < pages.length; i++) {
                if (pages[i]._id === pageId) {
                    pages.slice(i, 1);
                    break;
                }
            }

        }

    }

})();

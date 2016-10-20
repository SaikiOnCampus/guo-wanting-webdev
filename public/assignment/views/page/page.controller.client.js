(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        vm.websiteId = parseInt($routeParams['wid']);
        function init() {
            vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
        }
        init();
    }

    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        vm.websiteId = parseInt($routeParams['wid']);

        vm.addNewPage = addNewPage;

        function init() {
            vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
        }
        init();

        function addNewPage() {
            PageService.createPage(vm.websiteId, vm.page);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page")
        }
    }

    function EditPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        vm.websiteId = parseInt($routeParams['wid']);
        var pageId = parseInt($routeParams['pid']);
        vm.deleteThePage = deleteThePage;
        vm.updateThePage = updateThePage;

        function init() {
            vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
            vm.page = PageService.findPageById(pageId);
        }
        init();

        function deleteThePage() {
            PageService.deletePage(pageId);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }

        function updateThePage(pageId, page) {
            PageService.updatePage(pageId, page);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }


    }

})();

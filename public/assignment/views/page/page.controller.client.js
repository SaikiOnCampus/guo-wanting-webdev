(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        function init() {
            PageService.findPagesByWebsiteId(vm.websiteId).success(function (pages) {
                vm.pages = pages;
            });
        }
        init();
    }

    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];

        vm.addNewPage = addNewPage;

        function init() {
            PageService.findPagesByWebsiteId(vm.websiteId).success(function (pages) {
                vm.pages = pages;
            });
        }
        init();

        function addNewPage() {
            if (!vm.page || !vm.page.name) {
                vm.alert = "The name filed could not be empty.";
                return;
            }
            PageService.createPage(vm.websiteId, vm.page).success(function (page) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page")
            });
        }
    }

    function EditPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.deleteThePage = deleteThePage;
        vm.updateThePage = updateThePage;

        function init() {
            PageService.findPagesByWebsiteId(vm.websiteId).success(function (pages) {
                vm.pages = pages;
            });
            PageService.findPageById(vm.pageId).success(function (page) {
                vm.page = page;
            });
        }
        init();

        function deleteThePage() {
            PageService.deletePage(vm.pageId).success(function (status) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            });

        }

        function updateThePage(page) {
            if (!page || !page.name) {
                vm.alert = "The name field could not be empty."
                return;
            }
            PageService.updatePage(vm.pageId, page).success(function (page) {
                if (page != '0') {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                }
            });
        }


    }

})();

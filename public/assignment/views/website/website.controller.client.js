(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();
    }

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        vm.addNewWebsite = addNewWebsite;
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();

        function addNewWebsite() {
            WebsiteService.createWebsite(vm.userId, vm.website);
            $location.url("/user/" + vm.userId + "/website");
        }

    }

    function EditWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        vm.websiteId = parseInt($routeParams['wid']);
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            vm.website = angular.copy(WebsiteService.findWebsiteById(vm.websiteId));
            vm.websites = angular.copy(WebsiteService.findWebsitesByUser(vm.userId));
        }
        init();

        function updateWebsite(website) {
            WebsiteService.updateWebsite(vm.websiteId, website);
            $location.url("/user/" + vm.userId + "/website");

        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/" + vm.userId + "/website");
        }
    }
})();

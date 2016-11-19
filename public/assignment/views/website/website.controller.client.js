(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        function init() {
            WebsiteService.findWebsitesByUser(vm.userId).success(function (websites) {
                vm.websites = websites;
            });
        }
        init();
    }

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.addNewWebsite = addNewWebsite;
        function init() {
            WebsiteService.findWebsitesByUser(vm.userId).success(function (websites) {
                vm.websites = websites;
            });
        }
        init();

        function addNewWebsite() {
            WebsiteService.createWebsite(vm.userId, vm.website).success(function (website) {
                $location.url("/user/" + vm.userId + "/website");
            });
        }

    }

    function EditWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            WebsiteService.findWebsiteById(vm.websiteId).success(function (website) {
                if (website != '0') {
                    vm.website = website;
                }
            });
            WebsiteService.findWebsitesByUser(vm.userId).success(function (websites) {
                vm.websites = websites;
            });
        }
        init();

        function updateWebsite(website) {
            WebsiteService.updateWebsite(vm.websiteId, website).success(function (website) {
                if (website != '0') {
                    $location.url("/user/" + vm.userId + "/website");
                }
            });

        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId).success(function (res) {
                console.log(res);
                $location.url("/user/" + vm.userId + "/website");
            });
        }
    }
})();

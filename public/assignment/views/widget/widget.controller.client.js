(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, WidgetService, $sce) {
        var vm = this;
        vm.pageId = parseInt($routeParams['pid']);
        vm.userId = parseInt($routeParams['uid']);
        vm.websiteId = parseInt($routeParams['wid']);
        vm.checkSafeHTML = checkSafeHTML;
        vm.checkSafeYOUTUBE = checkSafeYOUTUBE;
        vm.checkSafeIMAGE = checkSafeIMAGE;

        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }
        init();

        function checkSafeHTML(html) {
            return $sce.trustAsHtml(html);
        }

        function checkSafeYOUTUBE(url) {
            if (url == '' || url == null) {
                return;
            }
            var parts = url.split("/");
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

        function checkSafeIMAGE(url) {
            return $sce.trustAsResourceUrl(url);
        }
    }

    function NewWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        vm.websiteId = parseInt($routeParams['wid']);
        vm.pageId = parseInt($routeParams['pid']);
        vm.toCreateNewWidget = toCreateNewWidget;

        // Todo: how to implement more properly
        function toCreateNewWidget(type) {
            var aWidget = {
                widgetType: type
            };
            aWidget = WidgetService.createWidget(vm.pageId, aWidget);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + aWidget._id);
        }
    }

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        vm.websiteId = parseInt($routeParams['wid']);
        vm.pageId = parseInt($routeParams['pid']);
        var widgetId = parseInt($routeParams['wgid']);
        vm.deleteTheWidget = deleteTheWidget;
        vm.updateTheWidget = updateTheWidget;

        function init() {
            vm.widget = WidgetService.findWidgetById(widgetId)
        }
        init();

        function deleteTheWidget() {
            WidgetService.deleteWidget(widgetId);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget")
        }

        function updateTheWidget(widgetId, widget) {
            WidgetService.updateWidget(widgetId, widget);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget")
        }
    }

})();

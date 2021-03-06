(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController)
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function WidgetListController($routeParams, WidgetService, $sce) {
        var vm = this;
        vm.pageId = $routeParams['pid'];
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.checkSafeHTML = checkSafeHTML;
        vm.checkSafeYOUTUBE = checkSafeYOUTUBE;
        vm.checkSafeIMAGE = checkSafeIMAGE;

        function init() {
            WidgetService.findWidgetsByPageId(vm.pageId).success(function (widgets) {
                vm.widgets = widgets;
            });
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
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.toCreateNewWidget = toCreateNewWidget;

        // Todo: how to implement more properly
        function toCreateNewWidget(type) {
            var aWidget = {
                name: "new widget",
                type: type
            };
            WidgetService.createWidget(vm.pageId, aWidget).success(function (pageObj) {
                aWidget = pageObj.widgets[pageObj.widgets.length - 1];
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + aWidget);
            });
        }
    }

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.widgetId = $routeParams['wgid'];
        vm.deleteTheWidget = deleteTheWidget;
        vm.updateTheWidget = updateTheWidget;

        function init() {
            WidgetService.findWidgetById(vm.widgetId).success(function (widget) {
                vm.widget = widget;
            });
        }
        init();

        function deleteTheWidget() {
            WidgetService.deleteWidget(vm.widgetId).success(function (status) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            });
        }

        function updateTheWidget(widget) {
            if (!widget || !widget.name) {
                vm.alert = "The name field could not be empty.";
                return;
            }
            WidgetService.updateWidget(vm.widgetId, widget).success(function (widget) {
                if (widget != '0') {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                }
            });
        }
    }

    function FlickrImageSearchController($routeParams, $location, FlickrService, WidgetService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.widgetId = $routeParams['wgid'];

        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function searchPhotos(searchTerm) {
            FlickrService.searchPhotos(searchTerm).success(function (response) {
                var data = response.replace("jsonFlickrApi(" , "");
                data = data.substring(0, data.length - 1);
                data = JSON.parse(data);
                vm.photos = data.photos;
            });
        }

        function selectPhoto(photo) {

            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            console.log(vm.widgetId);
            WidgetService.findWidgetById(vm.widgetId).success(function (widget) {
                widget.url = url;
                widget.name = "new photo"
                WidgetService.updateWidget(vm.widgetId, widget).success(function (widget) {
                    if (widget != '0') {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    }
                });
            });



        }
    }

})();

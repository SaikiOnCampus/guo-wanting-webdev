(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {

        var widgets = [
            { _id: 123, widgetType: "HEADER", pageId: 321, size: 2, text: "GIZMODO", canUpdate: true},
            { _id: 234, widgetType: "HEADER", pageId: 321, size: 4, text: "Lorem ipsum", canUpdate: true},
            { _id: 345, widgetType: "IMAGE", pageId: 321, width: "100%",
                url: "http://lorempixel.com/400/200/", canUpdate: true},
            { _id: 456, widgetType: "HTML", pageId: 321, text: "<p>Lorem ipsum</p>", canUpdate: true},
            { _id: 567, widgetType: "HEADER", pageId: 321, size: 4, text: "Lorem ipsum", canUpdate: true},
            { _id: 678, widgetType: "YOUTUBE", pageId: 321, width: "100%",
                url: "https://youtu.be/AM2Ivdi9c4E", canUpdate: true},
            { _id: 789, widgetType: "HTML", pageId: 321, text: "<p>Lorem ipsum</p>", canUpdate: true}
        ];

        var api = {
            createWidget : createWidget,
            findWidgetsByPageId : findWidgetsByPageId,
            findWidgetById : findWidgetById,
            updateWidget : updateWidget,
            deleteWidget : deleteWidget
        };

        return api;

        function createWidget(pageId, widget) {
            var id = null;
            while (id == null) {
                id = createId();
                for (var w in widgets) {
                    if (widgets[w]._id === id) {
                        id = null;
                        break;
                    }
                }
            }
            widget._id = id;
            widget.pageId = pageId;
            widgets.push(widget);

            function createId() {
                var id = Math.floor((Math.random() * 100));
                return id;
            }
            return widget;
        }

        function findWidgetsByPageId(pageId) {
            var pageWidgets = [];
            for (var w in widgets) {
                if (widgets[w].pageId === pageId) {
                    pageWidgets.push(widgets[w]);
                }
            }
            return pageWidgets;
        }

        function findWidgetById(widgetId) {
            for (var w in widgets) {
                if (widgets[w]._id === widgetId) {
                    return widgets[w];
                }
            }
        }

        function updateWidget(widgetId, widget) {
            for (var i = 0; i < widgets.length; i++) {
                if (widgets[i]._id === widgetId) {
                    widgets[i] = widget;
                    break;
                }
            }
        }

        function deleteWidget(widgetId) {
            for (var i = 0; i < widgets.length; i++) {
                if (widgets[i]._id === widgetId) {
                    widgets.splice(i, 1);
                    break;
                }
            }

        }

    }

})();

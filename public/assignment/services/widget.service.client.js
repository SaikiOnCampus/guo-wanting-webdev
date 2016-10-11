(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {

        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        var api = {
            "createWidget" : "createWidget",
            "findWidgetByPageId" : "findWidgetByPageId",
            "findWidgetById" : "findWidgetById",
            "updateWidget" : "updateWidget",
            "deleteWidget" : "deleteWidget"
        };

        return api;

        function createWidget(pageId, widget) {
            widget.pageId = pageId;
            widgets.push(widget);
        }

        function findWidgetByPageId(pageId) {
            for (var w in widgets) {
                if (w.pageId == pageId) {
                    return w;
                }
            }
        }

        function findWidgetById(widgetId) {
            for (var w in widgets) {
                if (w._id == widgetId) {
                    return w;
                }
            }
        }

        function updateWidget(widgetId, widget) {
            for (var i = i; i < widgets.length; i++) {
                if (widgets[i]._id == widgetId) {
                    widgets[i] = widget;
                    break;
                }
            }
        }

        function deleteWidget(widgetId) {
            for (var i = 0; i < widgets.length; i++) {
                if (widgets[i]._id == widgetId) {
                    widgets.slice(i, 1);
                    break;
                }
            }

        }

    }

})();

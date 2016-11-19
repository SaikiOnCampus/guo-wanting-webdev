module.exports = function (mongoose) {
    var widgetSchema = require("./widget.schema.server")(mongoose);
    var WidgetModel = mongoose.model('WidgetModel', widgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget
    };

    return api;

    function createWidget(pageId, widget) {
        widget._page = pageId;
        console.log(widget)
        return WidgetModel.create(widget);
    }

    function findAllWidgetsForPage(pageId) {
        return WidgetModel.find({_page: pageId});
    }

    function findWidgetById(widgetId) {
        return WidgetModel.findById(widgetId);
    }

    function updateWidget(widgetId, widget) {
        var rows = widget.rows;
        var size = widget.size;
        if (!rows) {
            rows = 0;
        }
        if (!size) {
            size = 0;
        }
        return WidgetModel.update(
            {
                _id: widgetId
            },
            {
                name: widget.name,
                text: widget.text,
                description: widget.description,
                url: widget.url,
                width: widget.width,
                height: widget.height,
                rows: rows,
                size: size,
                class: widget.class,
                icon: widget.icon,
                formatted: widget.formatted,
                deletable: widget.deletable,
                placeholder: widget.placeholder
            }
        );
    }

    function deleteWidget(widgetId) {
        return WidgetModel.remove({_id: widgetId});
    }

    function reorderWidget(pageId, start, end) {
        
    }
};

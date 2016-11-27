module.exports = function (mongoose) {
    var model = {};
    var widgetSchema = require("./widget.schema.server")(mongoose);
    var WidgetModel = mongoose.model('WidgetModel', widgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget,
        setModel: setModel
    };

    return api;

    function setModel(_model) {
        model = _model;
    }

    function createWidget(pageId, widget) {

        return WidgetModel.create(widget).then(function (widgetObj) {
            return model.pageModel.findPageById(pageId)
                .then(
                    function (pageObj) {
                        widgetObj._page = pageId;
                        widgetObj.save()
                        pageObj.widgets.push(widgetObj);
                        return pageObj.save()
                    },
                    function (error) {
                        console.log(error)
                    }
                )
        })
    }

    function findAllWidgetsForPage(pageId) {
        return model.pageModel.findPageById(pageId)
            .populate("widgets").exec()
        // return WidgetModel.find({_page: pageId});
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

module.exports = function (app, model) {
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

    var multer = require('multer');
    var mime = require('mime');
    var upload = multer({dest: __dirname + '/../../public/uploads'});
    var fs = require('fs');

    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);
    app.post('/api/upload', upload.single('myFile'), uploadImage);
    app.put('/api/page/:pageId/widget/sort', sortWidgets);

    function sortWidgets(req, res) {
        var initial = req.query.initial;
        var final = req.query.final;
        // Todo: save accoring to its actual order instead of single page order
        widgets.splice(final, 0, widgets.splice(initial, 1)[0]);
        res.sendStatus(200);
    }

    function uploadImage(req, res) {
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var widget = JSON.parse(req.body.photo);
        var myFile = req.file;

        if (typeof myFile == 'undefined') {
            res.status(400).send({message: "No file selected!"});
            return;
        }

        var originalname = myFile.originalname;
        var filename = myFile.fieldname;
        var path = myFile.path;
        var destination = myFile.destination;
        var size = myFile.size;
        var mimetype = myFile.mimetype;

        var photoname = "/image" + new Date().getTime() +  "." + mime.extension(mimetype);
        fs.rename(path, destination + photoname, function (err) {
            if (err) {
                console.log('ERROR: ' + err);
            }
        });

        var newwidget = {
            _id : widget._id,
            type: widget.type,
            _page: pageId,
            width: widget.width,
            url: "/uploads" + photoname
        };


        model.widgetModel.updateWidget(widget._id, newwidget).then(
            function (status) {
                res.redirect("/assignment/index.html#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widget._id)
            },
            function (error) {
                res.sendStatus(400).send(error);
            }
        );
        // var indexOfOrigin = -1;
        // for (var i = 0; i < widgets.length; i++) {
        //     if (widgets[i]._id == newwidget._id) {
        //         indexOfOrigin = i;
        //         widgets[i] = newwidget;
        //         break;
        //     }
        // }
        // if (indexOfOrigin === -1) {
        //     widgets.push(newwidget);
        // }


    }

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;
        model.widgetModel.createWidget(pageId, widget).then(
            function (widget) {
                res.send(widget);
            },
            function (error) {
                res.sendStatus(400).send(error);
            }
        );
        // widget._id = (new Date()).getTime();
        // widget.pageId = pageId;
        // widgets.push(widget);
        // res.send(widget);
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        model.widgetModel.findAllWidgetsForPage(pageId).then(
            function (widgets) {
                res.json(widgets);
            },
            function (error) {
                res.sendStatus(400).send(error);
            }
        );
        // var pageWidgets = [];
        // for (var w in widgets) {
        //     if (widgets[w].pageId === pageId) {
        //         pageWidgets.push(widgets[w]);
        //     }
        // }
        // res.send(pageWidgets);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        model.widgetModel.findWidgetById(widgetId).then(
            function (widget) {
                if (widget) {
                    res.send(widget);
                } else {
                    res.send('0');
                }
            },
            function (error) {
                res.sendStatus(400).send(error);
            }
        );
        // for (var w in widgets) {
        //     if (widgets[w]._id === widgetId) {
        //         res.send(widgets[w]);
        //         return;
        //     }
        // }
        // return '0';
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        model.widgetModel.updateWidget(widgetId, widget).then(
            function (status) {
                res.sendStatus(200);
            },
            function (error) {
                res.sendStatus(400).send(error);
            }
        );
        // var widget = req.body;
        // for (var w in widgets) {
        //     if (widgets[w]._id === widgetId) {
        //         widgets[w] = widget;
        //         res.send(widgets[w]);
        //         return;
        //     }
        // }
        // return '0';
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        model.widgetModel.deleteWidget(widgetId).then(
            function (status) {
                res.sendStatus(200);
            },
            function (error) {
                res.sendStatus(400).send(error);
            }
        );
        // for (var w in widgets) {
        //     if (widgets[w]._id === widgetId) {
        //         widgets.splice(w, 1);
        //         res.send(200);
        //         return;
        //     }
        // }
        // return '0';
    }

};
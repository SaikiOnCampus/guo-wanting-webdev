module.exports = function (app, model) {

    // var pages = [
    //     { _id: 321, name: "Post 1", websiteId: 456 },
    //     { _id: 432, name: "Post 2", websiteId: 456 },
    //     { _id: 543, name: "Post 3", websiteId: 456 }
    // ];

    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;
        model.pageModel.createPage(websiteId, page).then(
            function (websiteObj) {
                res.send(websiteObj);
            },
            function (error) {
                res.sendStatus(400).send(error);
            }
        );
        // page._id = (new Date()).getTime();
        // page.websiteId = websiteId;
        // pages.push(page);
        // res.send(page);
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        model.pageModel.findAllPagesForWebsite(websiteId).then(
            function (website) {
                res.send(website.pages);
            },
            function (error) {
                res.sendStatus(400).send(error);
            }
        );
        // var websitePages = [];
        // for (var p in pages) {
        //     if (pages[p].websiteId === websiteId) {
        //         websitePages.push(pages[p]);
        //     }
        // }
        // res.send(websitePages);
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        model.pageModel.findPageById(pageId).then(
            function (page) {
                if (page) {
                    res.send(page);
                } else {
                    res.send('0');
                }
            },
            function (error) {
                res.sendStatus(400).send(error);
            }
        );
        // for (var p in pages) {
        //     if (pages[p]._id === pageId) {
        //         res.send(pages[p]);
        //         return;
        //     }
        // }
        // return '0';
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var page = req.body;
        model.pageModel.updatePage(pageId, page).then(
            function (status) {
                res.sendStatus(200);
            },
            function (error) {
                res.sendStatus(400).send(error);
            }
        );
        // for (var p in pages) {
        //     if (pages[p]._id === pageId) {
        //         pages[p] = page;
        //         res.send(pages[p]);
        //         return;
        //     }
        // }
        // return '0';
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        model.pageModel.deletePage(pageId).then(
            function (status) {
                res.sendStatus(200);
            },
            function (error) {
                res.sendStatus(400);
            }
        );
        // for (var p in pages) {
        //     if (pages[p]._id === pageId) {
        //         pages.splice(p, 1);
        //         res.send(200);
        //         return;
        //     }
        // }
        // return '0';
    }

};
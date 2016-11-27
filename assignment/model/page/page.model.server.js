module.exports = function (mongoose) {
    var model = {};
    var pageSchema = require('./page.schema.server')(mongoose);
    var PageModel = mongoose.model('PageModel', pageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        setModel: setModel
    };

    return api;

    function setModel(_model) {
        model = _model;
    }

    function createPage(websiteId, page) {

        return PageModel.create(page).then(function (pageObj) {
            return model.websiteModel.findWebsiteById(websiteId)
                .then(
                    function (websiteObj) {
                        pageObj._website = websiteId;
                        pageObj.save();
                        websiteObj.pages.push(pageObj);
                        return websiteObj.save()
                    },
                    function (error) {
                        console.log(error)
                    }
                )
        })
    }

    function findAllPagesForWebsite(websiteId) {
        return model.websiteModel.findWebsiteById(websiteId)
            .populate("pages")
            .exec();
        // return PageModel.find({_website: websiteId});
    }

    function findPageById(pageId) {
        return PageModel.findById(pageId);
    }

    function updatePage(pageId, page) {
        return PageModel.update(
            {
                _id: pageId
            },
            {
                name: page.name,
                title: page.title
            }
            )
    }

    function deletePage(pageId) {
        return PageModel.remove({_id: pageId});
    }
};

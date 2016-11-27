module.exports = function (mongoose) {
    var model = {};
    var websiteSchema = require("./website.schema.server")(mongoose);
    var WebsiteModel = mongoose.model('WebsiteModel', websiteSchema);

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        setModel: setModel
    };

    function setModel(_model) {
        model = _model;
    }

    return api;

    function createWebsiteForUser(userId, website) {
        return WebsiteModel.create(website).then(
            function (websiteObj) {
               return model.userModel.findUserById(userId).then(
                    function (userObj) {
                        websiteObj._user = userId;
                        websiteObj.save()
                        userObj.websites.push(websiteObj);
                        return userObj.save()
                    },
                    function (error) {
                        console.log(error)
                    }
                )
            },
            function (error) {
                console.log(error);
            })

    }

    function findAllWebsitesForUser(userId) {
        return model.userModel.findUserById(userId)
            .populate("websites").exec();
        // return WebsiteModel.find({_user: userId});
    }

    function findWebsiteById(websiteId) {
        return WebsiteModel.findById(websiteId);
    }

    function updateWebsite(websiteId, website) {
        return WebsiteModel.update(
            {
                _id: websiteId
            },
            {
                name: website.name,
                description: website.description
            }
        );
    }

    function deleteWebsite(websiteId) {
        return WebsiteModel.remove({_id: websiteId});
    }

};


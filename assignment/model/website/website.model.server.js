module.exports = function (mongoose) {
    var websiteSchema = require("./website.schema.server")(mongoose);
    var WebsiteModel = mongoose.model('WebsiteModel', websiteSchema);

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite

    };

    return api;

    function createWebsiteForUser(userId, website) {
        website._user = userId;
        return WebsiteModel.create(website)

    }

    function findAllWebsitesForUser(userId) {
        return WebsiteModel.find({_user: userId});
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


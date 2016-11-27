module.exports = function() {

    var connectionString = 'mongodb://saiki:12345@ds033106.mlab.com:33106/webdev-saiki';
    var connectionStringLocal = 'mongodb://localhost/webappmaker'

    var mongoose = require('mongoose');
    mongoose.connect(connectionString);

    var UserModel = require("./user/user.model.server") (mongoose);
    var WebsiteModel = require("./website/website.model.server")(mongoose);
    var PageModel = require("./page/page.model.server") (mongoose);
    var WidgetModel = require("./widget/widget.model.server") (mongoose);

    var model = {
        userModel: UserModel,
        websiteModel: WebsiteModel,
        pageModel: PageModel,
        widgetModel: WidgetModel
    }

    UserModel.setModel(model);
    WebsiteModel.setModel(model);
    PageModel.setModel(model);
    WidgetModel.setModel(model);

    return model;

};

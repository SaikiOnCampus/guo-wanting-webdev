module.exports = function (app) {
    var model = require("./model/models.server")();

    require("./services/user.service.server.js")(app, model);
    require("./services/book.service.server.js")(app, model);
    require("./services/review.service.server.js")(app, model);

}

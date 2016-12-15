module.exports = function (mongoose) {

    //var webSchema = require("../website/website.schema.server.js") (mongoose)

    var bookSchema = mongoose.Schema({
        bookIdentity: {type: String, required: true},
        name: {type: String, required: true},
        cover: {type: String, required: true}
    });

    return bookSchema
}

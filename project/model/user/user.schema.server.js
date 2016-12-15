module.exports = function (mongoose) {

    //var webSchema = require("../website/website.schema.server.js") (mongoose)

    var readerSchema = mongoose.Schema({
        isAdmin: {type: Boolean, default: false},
        username: {type: String, required: true},
        password: {type: String, required: true},
        firstname: String,
        lastname: String,
        email: String,
        read: [{type: mongoose.Schema.Types.ObjectId, ref: 'BookModel'}],
        review:[{type: mongoose.Schema.Types.ObjectId, ref: 'ReviewModel'}],
        dateCreated: {type: Date, default: Date.now}
    });

    return readerSchema
}

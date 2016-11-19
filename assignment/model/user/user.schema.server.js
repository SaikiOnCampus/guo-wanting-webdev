module.exports = function (mongoose) {

    //var webSchema = require("../website/website.schema.server.js") (mongoose)

    var userSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: {type: String, required: true},
        firstname: String,
        lastname: String,
        email: String,
        phone: String,
        websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'}],
        dateCreated: {type: Date, default: Date.now}
    });

    return userSchema
}

module.exports = function (mongoose) {

    //var webSchema = require("../website/website.schema.server.js") (mongoose)

    var reviewSchema = mongoose.Schema({
        _reader: {type: mongoose.Schema.Types.ObjectId, ref: 'ReaderModel'},
        book: String,
        content: String,
        dateCreated: {type: Date, default: Date.now}
    });

    return reviewSchema
}

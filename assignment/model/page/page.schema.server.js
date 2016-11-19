module.exports = function (mongoose) {

    var pageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'},
        name: {type: String, require: true},
        title: String,
        description: String,
        widgets: [{type: mongoose.Schema.Types.ObjectId, ref: 'WidgetModel'}],
        dateCreated: {type: Date, default: Date.now}
    });

    return pageSchema;
}

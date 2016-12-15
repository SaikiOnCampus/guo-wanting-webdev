module.exports = function (mongoose) {
    var model = {};
    var bookSchema = require('./book.schema.server')(mongoose);
    var BookModel = mongoose.model("BookModel", bookSchema);

    var api = {
        setModel: setModel,
        findBookByIdentifier: findBookByIdentifier,
        createBook: createBook
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function findBookByIdentifier(identity) {
        return BookModel.find({bookIdentity: identity});
    }

    function createBook(book) {
        return BookModel.create(book);
    }

};

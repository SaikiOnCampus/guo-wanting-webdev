module.exports = function() {

    var connectionString = 'mongodb://saiki:12345@ds033106.mlab.com:33106/webdev-saiki';
    var connectionStringLocal = 'mongodb://localhost/bookedread';

    var mongoose = require('mongoose');
    mongoose.connect(connectionString);
    // mongoose.connect(connectionStringLocal);

    var ReaderModel = require("./user/user.model.server") (mongoose);
    var BookModel = require("./book/book.model.server") (mongoose);
    var ReviewModel = require("./review/review.model.server")(mongoose);

    var model = {
        readerModel: ReaderModel,
        bookModel: BookModel,
        reviewModel: ReviewModel
    }

    ReaderModel.setModel(model);
    BookModel.setModel(model);
    ReviewModel.setModel(model);
    return model;

};

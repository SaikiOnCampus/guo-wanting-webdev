module.exports = function (mongoose) {
    var model = {};
    var reviewSchema = require('./review.schema.server')(mongoose);
    var ReviewModel = mongoose.model("ReviewModel", reviewSchema);

    var api = {
        setModel: setModel,
        createReview: createReview,
        findReviewsByBook: findReviewsByBook,
        deleteReview: deleteReview
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createReview(review) {
        return ReviewModel.create(review);
    }

    function findReviewsByBook(book) {
        return ReviewModel.find({book: book}).populate("_reader").exec();
    }

    function deleteReview(rid) {
        return ReviewModel.remove({_id: rid});
    }

};

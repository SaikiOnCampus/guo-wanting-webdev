module.exports = function (app, model) {
    app.post('/api/project/review', writeReview);
    app.get('/api/project/reviews/:book', getBookReviews);
    app.delete("/api/project/review/:rid", deleteReview);

    function deleteReview(req, res) {
        var rid = req.params.rid;
        model.reviewModel.deleteReview(rid).then(
            function (response) {
                res.sendStatus(200);
            },
            function (err) {
                res.send(err).sendStatus(400);
            }
        )
    }

    function writeReview(req, res) {
        var review = req.body;
        model.reviewModel.createReview(review).then(
            function (reviewObj) {
                res.send(reviewObj);
            },
            function (err) {
                res.send(err).sendStatus(400);
            }
        );
    }

    function getBookReviews(req, res) {
        var book = req.params.book;
        model.reviewModel.findReviewsByBook(book).then(
            function (reviews) {
                if (reviews) {
                    console.log("in review service server");
                    console.log(reviews);
                    res.send(reviews);
                } else {
                    res.send('0');
                }
            },
            function (err) {
                res.send(err).sendStatus(400);
            }
        )
    }

}

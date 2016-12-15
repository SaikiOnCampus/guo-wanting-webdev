module.exports = function (app, model) {

    app.post("/api/project/book", createBook);
    app.post("/api/project/savebook/:uid", saveBookForUser);
    app.delete("/api/project/deletebook/:uid/book/:bid", deleteBookFromReadingList);
    app.get("/api/project/book/:bidt", findBookByIdentity);
    app.get("/api/project/readinglist/:uid/book/:bidt", findBookInUserReadingList);

    function createBook(req, res) {
        var book = req.body;
        model.bookModel.createBook(book).then(
            function (book) {
                res.send(book);
            },
            function (err) {
                res.send(err).sendStatus(400);
            }
        )
    }

    function deleteBookFromReadingList(req, res) {
        var uid = req.params.uid;
        var bid = req.params.bid;
        model.readerModel.deleteBookFromReadingList(uid, bid).then(
            function (user) {
                res.send(user);
            },
            function (err) {
                res.send(err).sendStatus(err);
            }
        )
    }

    function saveBookForUser(req, res) {
        var bookid = req.body;
        var uid = req.params.uid;
        model.readerModel.saveBookToReadingList(uid, bookid._id).then(
            function (user) {
                res.send(user);
            },
            function (err) {
                res.send(err).sendStatus(400);
            }
        )
    }

    function findBookByIdentity(req, res) {
        var identity = req.params.bidt;
        model.bookModel.findBookByIdentifier(identity).then(
            function (book) {
                if (book.length == 0) {
                    res.send('0')
                } else {
                    res.send(book[0]);
                }
            },
            function (err) {
                res.send(err).sendStatus(400);
            }
        )
    }

    function findBookInUserReadingList(req, res) {
        var identity = req.params.bidt;
        console.log("findBookInUserReadingList");
        console.log(identity);
        var userId = req.params.uid;
        model.readerModel.findBooksForUser(userId).then(
            function (user) {
                var books = user.read;
                console.log("I am checking the book service server!")
                console.log("...............")
                console.log(books);
                for (var i in books) {
                    if (books[i].bookIdentity == identity) {
                        res.send(books[i]);
                        return;
                    }
                }
                res.send('0');
            },
            function (err) {
                res.send(err).sendStatus(400);
            }
        )

    }

}

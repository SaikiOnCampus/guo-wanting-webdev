module.exports = function (mongoose) {
    var model = {};
    var readerSchema = require('./user.schema.server')(mongoose);
    var ReaderModel = mongoose.model("ReaderModel", readerSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser,
        setModel: setModel,
        findWebsitesForUser: findWebsitesForUser,
        saveBookToReadingList: saveBookToReadingList,
        findBooksForUser: findBooksForUser,
        deleteBookFromReadingList: deleteBookFromReadingList
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createUser(user) {
        return ReaderModel.create(user);
    }


    function findUserById(userId) {
        return ReaderModel.findById(userId);
    }

    function findWebsitesForUser(userId) {
        ReaderModel.findById(userId).then(function (user) {
            return user.websites;
        }, function (error) {
            console.log(error)
        })
    }

    function findUserByUsername(username) {
        return ReaderModel.find({username: username});
    }

    function findUserByCredentials(username, password) {
        console.log("i am in reader model")
        return ReaderModel.findOne({username: username, password: password});
    }

    function updateUser(userId, user) {
        return ReaderModel.update(
            {
                _id: userId
            },
            {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
            });
        // return UserModel.findByIdAndUpdate(userId, user, {new: true});
    }

    function deleteUser(userId) {
        return ReaderModel.remove({_id: userId});
    }

    function saveBookToReadingList(uid, bookid) {
        return ReaderModel.update(
            {
                _id: uid
            },
            {
                $push: {
                    read: bookid
                }
            }
        )
    }

    function deleteBookFromReadingList(uid, bookid) {
        return ReaderModel.update(
            {
                _id: uid
            },
            {
                $pull: {
                    read: bookid
                }
            }
        )
    }

    function findBooksForUser(uid) {
        return ReaderModel.findById(uid).populate("read").exec();
    }

};

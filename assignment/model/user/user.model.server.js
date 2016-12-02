module.exports = function (mongoose) {
    var model = {};
    var userSchema = require('./user.schema.server')(mongoose);
    var UserModel = mongoose.model("UserModel", userSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser,
        setModel: setModel,
        findWebsitesForUser: findWebsitesForUser
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createUser(user) {
        return UserModel.create(user);
    }


    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function findWebsitesForUser(userId) {
        UserModel.findById(userId).then(function (user) {
            return user.websites;
        }, function (error) {
            console.log(error)
        })
    }

    function findUserByUsername(username) {
        return UserModel.findOne({username: username});
    }

    function findUserByCredentials(username, password) {
        console.log("aaaa");
        return UserModel.findOne({username: username, password: password});
    }

    function updateUser(userId, user) {
        return UserModel.update(
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
        return UserModel.remove({_id: userId});
    }

};

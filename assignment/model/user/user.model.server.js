module.exports = function (mongoose) {
    var userSchema = require('./user.schema.server')(mongoose);
    var UserModel = mongoose.model("UserModel", userSchema);

    var api = {
        createUser: createUser,
        populateWebsites: populateUserWebsites,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser
    }
    return api;

    function createUser(user) {
        return UserModel.create(user);
    }

    function populateUserWebsites(userId) {
        return UserModel.findById(userId).populate('websites');
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function findUserByUsername(username) {
        return UserModel.find({username: username});
    }

    function findUserByCredentials(username, password) {
        console.log("aaaa");
        return UserModel.find({username: username, password: password});
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

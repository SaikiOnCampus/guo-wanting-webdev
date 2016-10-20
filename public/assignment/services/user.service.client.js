(function () {

    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {

        var users = [
            {_id: 123, username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice@gmail.com"},
            {_id: 234, username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley",  email: "bob@gmail.com"},
            {_id: 345, username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia",  email: "charly@gmail.com"},
            {_id: 456, username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jannunzi@gmail.com"}
        ];

        var api = {
            createUser: createUser,
            findUserById : findUserById,
            findUserByUserName: findUserByUserName,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser
        };

        return api;


        function createUser(user) {
            function createId() {
                var id = Math.floor((Math.random() * 100));
                return id;
            }
            var id = null;
            while (id == null) {
                id = createId();
                for (var u in users) {
                    if (users[u]._id === id) {
                        id = null;
                        break;
                    }
                }
            }
            user._id = id;
            users.push(user);
            return user;
        }

        function findUserById(userId) {
            for (var u in users) {
                if (users[u]._id === userId) {
                    return users[u];
                }
            }
            return null;
        }

        function findUserByUserName(username) {
            for (var u in users) {
                if (users[u].username == username) {
                    return users[u];
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for (var u in users) {
                if (users[u].username === username && users[u].password === password) {
                    return users[u];
                }
            }
            return null;
        }

        function updateUser(userId, user) {
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id == userId) {
                    users[i] = user;
                    break;
                }
            }
        }

        function deleteUser(userId) {
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id == userId) {
                    users.slice(i, 1);
                    break;
                }
            }
        }

    }


    
})();

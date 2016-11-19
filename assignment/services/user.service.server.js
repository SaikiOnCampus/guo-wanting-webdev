module.exports = function (app, model) {
    // var users = [
    //     {_id: 123, username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice@gmail.com"},
    //     {_id: 234, username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley",  email: "bob@gmail.com"},
    //     {_id: 345, username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia",  email: "charly@gmail.com"},
    //     {_id: 456, username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jannunzi@gmail.com"}
    // ];

    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:userId', findUserById);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);

    function createUser(req, res) {
        var user = req.body;
        model.userModel.createUser(user).then(
            function (newuser) {
                res.send(newuser);
            },
            function (error) {
                res.sendStatus(400)
            }
        );

        // user._id = (new Date()).getTime();
        // users.push(user);
        // res.send(user);
    }

    function findUser(req, res) {
        var query = req.query;
        if (query.password && query.username) {
            findUserByCredentials(req, res);
        } else if (query.username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        model.userModel.findUserByUsername(username).then(
            function (users) {
                if (users) {
                    res.send(users[0]);
                } else {
                    res.send('0');
                }
            },
            function (error) {
                res.sendStatus(400).send(error);
            }
        );

        // for (var i in users) {
        //     if (users[i].username === username) {
        //         res.send(users[i]);
        //         return;
        //     }
        // }
        // res.send('0');
    }

    function findUserByCredentials(req, res) {
        var query = req.query;
        var username = query.username;
        var password = query.password;

        model.userModel.findUserByCredentials(username, password).then(
            function (users) {
                if (users[0]) {
                    res.json(users[0]);
                } else {
                    res.send('0');
                }
            },
            function (error) {
                res.sendStatus(400).send(error);
            }
        );

        // for (var i in users) {
        //     if (users[i].username === username && users[i].password === password) {
        //         res.send(users[i]);
        //         return;
        //     }
        // }
        // res.send('0');
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        model.userModel.findUserById(userId).then(
            function (user) {
                if (user) {
                    res.send(user);
                } else {
                    res.send('0');
                }
            },
            function (error) {
                res.sendStatus(400).send(error)
            }
        );

        // for (var u in users) {
        //     if (users[u]._id === userId) {
        //         res.send(users[u]);
        //         return;
        //     }
        // }
        // res.send('0');
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;
        model.userModel.updateUser(userId, user).then(
            function (status) {
                res.send(200)
            },
            function (error) {
                res.sendStatus(400).send(error);
            }
        );
        // for (var i = 0; i < users.length; i++) {
        //     if (users[i]._id === userId) {
        //         users[i] = user;
        //         console.log(users[i]);
        //         res.send(users[i]);
        //         return;
        //     }
        // }
        // // couldnt find the user
        // res.send('0');
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        model.userModel.deleteUser(userId).then(
            function (result) {
                res.sendStatus(200);
            },
            function (error) {
                res.sendStatus(400).send(error);
            }
        );
        // for (var i = 0; i < users.length; i++) {
        //     if (users[i]._id == userId) {
        //         users.slice(i, 1);
        //         res.send(200);
        //     }
        // }
        // res.send('0');
    }
    
};
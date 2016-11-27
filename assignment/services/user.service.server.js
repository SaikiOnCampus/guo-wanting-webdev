

module.exports = function (app, model) {
    // var users = [
    //     {_id: 123, username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice@gmail.com"},
    //     {_id: 234, username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley",  email: "bob@gmail.com"},
    //     {_id: 345, username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia",  email: "charly@gmail.com"},
    //     {_id: 456, username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jannunzi@gmail.com"}
    // ];

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var cookieParser = require('cookie-parser');
    var session = require('express-session');

    app.use(session({
        secret: 'hello world',
        resave: true,
        saveUninitialized: true
    }));

    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(localStrategy));

    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:userId', findUserById);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);
    app.post('/api/login',passport.authenticate('local'), login);
    app.post('/api/checkLogin', checkLogin);
    app.post('/api/logout', logout);

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model.userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }


    function localStrategy(username, password, done) {
        model.userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if(!user) {
                        return done(null, false);
                    } else {
                        return done(null, user);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }
    
    function checkLogin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }
    
    function logout(req, res) {
        console.log("loging out!")
        req.logOut();
        res.sendStatus(200);
    }


    function createUser(req, res) {
        var user = req.body;
        model.userModel.createUser(user).then(
            function (newuser) {
                req.login(newuser, function (err) {
                    if (err) {
                        res.sendStatus(400);
                        res.send(err);
                    } else {
                        res.send(newuser);
                    }
                })
            },
            function (error) {
                console.log(error)
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
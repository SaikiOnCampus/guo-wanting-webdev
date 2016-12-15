

module.exports = function (app, model) {


    var passport = require('passport');
    var ProjectLocalStrategy = require('passport-local').Strategy;
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

    passport.use(new ProjectLocalStrategy(projectLocalStrategy));

    app.post('/api/project/user', createUser);
    app.get('/api/project/user', findUser);
    app.get('/api/project/user/:userId', findUserById);
    app.put('/api/project/user/:userId', updateUser);
    app.delete('/api/project/user/:userId', deleteUser);
    app.post('/api/project/login',passport.authenticate('local'), login);
    app.post('/api/project/checkLogin', checkLogin);
    app.post('/api/project/logout', logout);
    app.get('/api/project/readinglist/:uid', getReadingList);

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function serializeUser(user, done) {
        // console.log("I am serializing thing")
        done(null, user);
    }

    function deserializeUser(user, done) {
        model.readerModel
            .findUserById(user._id)
            .then(
                function(user){
                    // console.log("I am deserialzing thing")
                    done(null, user);
                },
                function(err){
                    // console.log("I am not deserialzing thing")
                    done(err, null);
                }
            );
    }


    function projectLocalStrategy(username, password, done) {
        // console.log("I am in project local strategy")
        model.readerModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if(!user) {
                        // console.log("can not find a user!");
                        return done(null, false);
                    } else {
                        // console.log("authenticate");
                        return done(null, user);
                    }
                },
                function(err) {
                    console.log("db err: " + err);
                    if (err) { return done(err); }
                }
            );
    }

    function login(req, res) {
        // console.log(req.user)
        // console.log(req.isAuthenticated());
        var user = req.user;
        res.json(user);
    }
    
    function checkLogin(req, res) {
        // console.log(req.isAuthenticated());
        res.send(req.isAuthenticated() ? req.user : '0');
    }
    
    function logout(req, res) {
        // console.log("loging out!")
        req.logOut();
        res.sendStatus(200);
    }


    function createUser(req, res) {
        var user = req.body;
        model.readerModel.createUser(user).then(
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
                // console.log(error)
                res.sendStatus(400)
            }
        );

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
        model.readerModel.findUserByUsername(username).then(
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

    }

    function findUserByCredentials(req, res) {
        var query = req.query;
        var username = query.username;
        var password = query.password;

        model.readerModel.findUserByCredentials(username, password).then(
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

    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        model.readerModel.findUserById(userId).then(
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
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;
        model.readerModel.updateUser(userId, user).then(
            function (status) {
                res.send(200)
            },
            function (error) {
                res.sendStatus(400).send(error);
            }
        );

    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        model.readerModel.deleteUser(userId).then(
            function (result) {
                res.sendStatus(200);
            },
            function (error) {
                res.sendStatus(400).send(error);
            }
        );

    }

    function getReadingList(req, res) {
        var uid = req.params.uid;
        model.readerModel.findBooksForUser(uid).then(
            function (user) {
                res.send(user.read);
            },
            function (err) {
                res.sendStatus(400).send(err);
            }
        )
    }
    
};
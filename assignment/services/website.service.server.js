module.exports = function (app, model) {
    // var websites = [
    //     { _id: 123, name: "Facebook",    developerId: 456 , description: "I am facebook!"},
    //     { _id: 234, name: "Tweeter",     developerId: 456, description: "I am tweeter!" },
    //     { _id: 456, name: "Gizmodo",     developerId: 456, description: "I am gizmdo!" },
    //     { _id: 567, name: "Tic Tac Toe", developerId: 123, description: "I am tic tac toe!" },
    //     { _id: 678, name: "Checkers",    developerId: 123, description: "I am checkers!" },
    //     { _id: 789, name: "Chess",       developerId: 234, description: "I am chess!" }
    // ];

    app.post('/api/user/:userId/website', createWebsite);
    app.get('/api/user/:userId/website', findAllWebsitesForUser);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);
    
    function createWebsite(req, res) {
        var website = req.body;
        var userId = req.params.userId;
        // website._id = (new Date()).getTime();
        // website.developerId = userId;
        // websites.push(website);
        model.websiteModel.createWebsiteForUser(userId, website).then(
            function (newwebsite) {
                model.userModel.populateWebsites(userId).then(
                    function (doc) {
                        console.log(doc);
                    }
                );
                res.send(newwebsite);
            },
            function (error) {
                res.sendStatus(400).send(error);
            }
        );
        //
        // res.send(website);

    }
    
    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        model.websiteModel.findAllWebsitesForUser(userId).then(
            function (websites) {
                res.json(websites);
            },
            function (error) {
                res.sendStatus(400).send(error);
            }
        )
        // var userWebsites = [];
        // for (var w in websites) {
        //     if (websites[w].developerId === userId) {
        //         userWebsites.push(websites[w]);
        //     }
        // }
        // res.send(userWebsites);
    }
    
    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        model.websiteModel.findWebsiteById(websiteId).then(
            function (website) {
                if (website) {
                    res.send(website);
                } else {
                    res.send('0');
                }
            }
        );
        // for (var w in websites) {
        //     if (websites[w]._id === websiteId) {
        //         res.send(websites[w]);
        //         return;
        //     }
        // }
        // res.send('0');
    }
    
    function updateWebsite(req, res) {
        var website = req.body;
        var websiteId = req.params.websiteId;
        model.websiteModel.updateWebsite(websiteId, website).then(
            function (status) {
                res.sendStatus(200);
            },
            function (error) {
                res.sendStatus(400).send(error);
            }
        );
        // for (var i = 0; i < websites.length; i++) {
        //     if (websites[i]._id === websiteId) {
        //         websites[i] = website;
        //         res.send(websites[i]);
        //         return;
        //     }
        // }
        // res.send('0');
    }
    
    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        model.websiteModel.deleteWebsite(websiteId).then(
            function (status) {
                res.sendStatus(200);
            },
            function (error) {
                res.sendStatus(400).send(error);
            }
        );
        // for (var i = 0; i < websites.length; i++) {
        //     if (websites[i]._id === websiteId) {
        //         websites.splice(i, 1);
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.send('0');
    }


};
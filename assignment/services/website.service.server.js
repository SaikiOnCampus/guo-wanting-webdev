module.exports = function (app) {
    var websites = [
        { _id: 123, name: "Facebook",    developerId: 456 , description: "I am facebook!"},
        { _id: 234, name: "Tweeter",     developerId: 456, description: "I am tweeter!" },
        { _id: 456, name: "Gizmodo",     developerId: 456, description: "I am gizmdo!" },
        { _id: 567, name: "Tic Tac Toe", developerId: 123, description: "I am tic tac toe!" },
        { _id: 678, name: "Checkers",    developerId: 123, description: "I am checkers!" },
        { _id: 789, name: "Chess",       developerId: 234, description: "I am chess!" }
    ];

    app.post('/api/user/:userId/website', createWebsite);
    app.get('/api/user/:userId/website', findAllWebsitesForUser);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);
    
    function createWebsite(req, res) {
        var website = req.body;
        var userId = parseInt(req.params.userId);
        website._id = (new Date()).getTime();
        website.developerId = userId;
        websites.push(website);
        res.send(website);

    }
    
    function findAllWebsitesForUser(req, res) {
        var userId = parseInt(req.params.userId);
        var userWebsites = [];
        for (var w in websites) {
            if (websites[w].developerId === userId) {
                userWebsites.push(websites[w]);
            }
        }
        res.send(userWebsites);
    }
    
    function findWebsiteById(req, res) {
        var websiteId = parseInt(req.params.websiteId);
        for (var w in websites) {
            if (websites[w]._id === websiteId) {
                res.send(websites[w]);
                return;
            }
        }
        res.send('0');
    }
    
    function updateWebsite(req, res) {
        var website = req.body;
        var websiteId = parseInt(req.params.websiteId);
        for (var i = 0; i < websites.length; i++) {
            if (websites[i]._id === websiteId) {
                websites[i] = website;
                res.send(websites[i]);
                return;
            }
        }
        res.send('0');
    }
    
    function deleteWebsite(req, res) {
        var websiteId = parseInt(req.params.websiteId);
        for (var i = 0; i < websites.length; i++) {
            if (websites[i]._id === websiteId) {
                websites.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.send('0');
    }


};
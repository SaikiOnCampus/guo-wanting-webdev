var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

//require ("./test/app.js")(app)
// require ("./assignment/app.js")(app);
 require ("./project/app.js") (app);

var ipaddress = "127.0.0.1";
var port      = 3000;

app.listen(port, ipaddress);

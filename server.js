
var express = require('express');
var port = process.env.port || 1337;
var app = express();
var colors = require('colors');

app.use(express.static(__dirname + '/public/scripts'));
app.use(express.static(__dirname + '/public/styles'));
app.use(express.static(__dirname + '/public'));

require('./app/routes.js')(app);
app.listen(port);

console.log(colors.bgGreen('Express app listening on port ' + port + ', type http://localhost:' + port + ' in your browser\n'));
console.log(colors.bgYellow('/billing - Billing Page'));
console.log(colors.bgYellow('/records - LevelDB records Page'));
var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({
    defaultLayout: 'main'
});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/', function(req, res) {
    var context = {};
    context.queryParams = [];
    for (var p in req.query) {
        context.queryParams.push({
            'key': p,
            'value': req.query[p]
        });
    }
    context.method = req.method;
    res.render('index', context);
});

app.post('/', function(req, res) {
    var context = {};
    context.bodyParams = [];
    context.queryParams = [];
    for (var p in req.body) {
        context.bodyParams.push({
            'key': p,
            'value': req.body[p]
        });
    }
    for (var p in req.query) {
        context.queryParams.push({
            'key': p,
            'value': req.query[p]
        });
    }

    context.method = req.method;
    res.render('index', context);
    console.log(req.body);
});

app.use(function(req, res) {
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

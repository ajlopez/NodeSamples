
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

app.map = function(obj, route) {
    route = route || '';
    for (var key in obj) {
        var value = obj[key];
        
        switch (typeof(value)) {
            case 'object':
                app.map(value, route + '/' + key);
                break;
            case 'function':
                app.get(route + '/' + key, obj[key]);
                break;
        }
    }
};

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

app.map({
    'page1': function(req, res) { res.send('page 1'); },
    'page2': function(req, res) { res.send('page 2'); },
    'user': {
        ':uid': function(req, res) { res.send('user ' + req.params.uid); }
    },
    admin: {
        'page1': function(req, res) { res.send('admin page 1'); },
        'page2': function(req, res) { res.send('admin page 2'); }
    }
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

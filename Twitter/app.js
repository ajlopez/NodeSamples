
var http = require('http'),
    url = require('url');


function makeOptions(path) {
    var options = {
        hostname: 'api.del.icio.us',
        port: 443,
        path: path,
        method: 'GET',
        auth: process.env.DELICIOUS_USER + ':' + process.env.DELICIOUS_PASSWORD
    };

    return options;
}

function getData(pageurl, cb) {
    var urldata = url.parse(pageurl);
    
    options = {
        host: urldata.hostname,
        port: urldata.port,
        path: urldata.path,
        method: 'GET'
    };
    http.get(options, function(res) { 
            console.log('Url: ' + pageurl);
            res.setEncoding('utf8');
            res.on('data', function(data) {
                cb(data);
            });
       }).on('error', function(e) {
            console.log('Url: ' + pageurl);
            console.log('Error: ' + e.message);
        });
}

//http://search.twitter.com/search.atom?
//getData("https://api.twitter.com/1.1/search/tweets.json?q=" + process.argv[2], function (data) {
getData("http://search.twitter.com/search.atom?q=" + process.argv[2], function (data) {
    console.log(data);
});


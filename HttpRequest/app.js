
var http = require('http'),
    url = require('url');

function download(pageurl)
{
    var urldata = url.parse(pageurl);
    
    var options = {
        host: urldata.hostname,
        port: urldata.port,
        path: urldata.path,
        method: 'GET'
    };
    
    var req = http.request(options, function(res) {
        console.log('URL: ' + url);
        console.log('Status: ' + res.statusCode);
        console.log('Headers: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Body: ' + chunk);
        });
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

    req.end();
}

process.argv.forEach(function(arg) {
    if (arg.indexOf("http:")==0)
        download(arg);
});

















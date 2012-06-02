
var http = require('http'),
    url = require('url'),
    util = require('util'),
    events = require('events');
    
function Resolver()
{
    events.EventEmitter.call(this);
    this.visited = {};
    this.process = function(link) {
        var urldata = url.parse(link);

        if (!isHostName(urldata.hostname))
            return;

        if (this.visited[link])
            return;

        this.visited[link] = true;
        this.emit('link', link);
    }
}

util.inherits(Resolver, events.EventEmitter);

var resolver = new Resolver();

var hostnames = {};

function registerHostName(hostname)
{
    if (!hostnames[hostname])
    {
        console.log('Host: ' + hostname);
        hostnames[hostname] = true;
    }
}

function isHostName(hostname)
{
    return hostnames[hostname];
}
    
function download(pageurl, cb)
{
    var urldata = url.parse(pageurl);
    
    registerHostName(urldata.hostname);
    
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

var match1 = /href=\s*"([^&"]*)"/i;
var match2= /href=\s*'([^&']*)'/i;

function harvest(data) {
    var links = match1.exec(data);

    if (links)
        links.forEach(function(link) { 
            if (link.indexOf('http:') == 0)
                resolver.process(link);
        });

    links = match2.exec(data);

    if (links)
        links.forEach(function(link) { 
            if (link.indexOf('http:') == 0)
                resolver.process(link);
        });
}

resolver.on('link', function(link) { download(link, harvest); });

process.argv.forEach(function(arg) {
    if (arg.indexOf("http:")==0)
        download(arg, harvest);
});


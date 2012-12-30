
var http_port = 8000;

var http = require('http'),
    querystring = require('querystring'),
    path = require('path'),
    fs = require('fs'),
    url = require('url');
    
var customers = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Google' },
    { id: 3, name: 'Microsoft' }
];

var maxid = 3;

function doHeader(res, title)
{
    res.writeHead(200, {'content-type': 'text/html'});
    res.write('<html><head><title>');
    res.write('CRUD Simple Sample: ' + title);
    res.write('</title>');
    res.write('<link rel="stylesheet" href="/css/bootstrap.css">');
    res.write('</head>');
    res.write('<body>');
    
    res.write('<div>');
    res.write('<a href="/">Home</a> ');
    res.write('<a href="/customer">Customers</a>');
    res.write('</div>');
    
    res.write('<h1>');
    res.write(title);
    res.write('</h1>');
}

function doFooter(res)
{
    res.write('</body>');
    res.write('</html>');
}

function doHome(req, res)
{
    doHeader(res, 'Home');
    res.write('<div>Simple CRUD sample, in-memory model.</div>');
    res.write('<div>Using Query String (no parameters in URL, or post processing, yet).</div>');
    res.write('<div>No static files.</div>');
    doFooter(res);
    res.end();
}

function doTBD(res)
{
    res.write('<div>[TBD]</div>\n');
}

function doCustomerView(req, res)
{
    doHeader(res, 'Customer');
    doTBD(res);
    res.end();
}

function doCustomerList(req, res)
{
    doHeader(res, 'Customers');
    res.write('<div class="btn-group">\
<a class="btn btn-primary" href="/customer/new">New Customer</a>\
</div>');
    
    res.write('<table class="table-striped table-bordered" style="min-width: 500px;">\n');
    res.write('<tr><th>Id</th><th>Name</th></tr>\n');
    
    customers.forEach(function(customer) {
        res.write('<tr>\n');
        res.write('<td><a href="/customer/view?id=' + customer.id + '">' + customer.id + '</a></td>\n');
        res.write('<td>' + customer.name + '</td>\n');
        res.write('</tr>\n');
    });
    
    res.write('</table>\n');
    
    doFooter(res);
    res.end();
}

function doCustomerNew(req, res)
{
    doHeader(res, 'New Customer');
    
    res.write('<form action="/customer/newprocess" method="post">\n');
    res.write('<fieldset>\n');
    res.write('<legend>Name</legend>\n');
    res.write('<div><input name="name"></div>\n');
    
    res.write('</fieldset>\n');

    res.write('<input type="submit" value="Submit"/>\n');
    res.write('</form>\n');
    
    doFooter(res);
    res.end();
}

function doCustomerNewProcess(req, res)
{
    maxid++;
    var customer = { id: maxid, name:  req.params.name };
    customers.push(customer);
    res.writeHead(302, { 'Location': '/customer' });
    res.end();
}

var mapping = {};

mapping['/'] = doHome;
mapping['/customer'] = doCustomerList;
mapping['/customer/new'] = doCustomerNew;
mapping['/customer/view'] = doCustomerView;
mapping['/customer/newprocess'] = doCustomerNewProcess;

var staticdir = path.join(__dirname, '/public');

function sendStatic(req, res) {
    var filename = path.join(staticdir, req.url);
    console.log(filename);
    fs.stat(filename, function(err, stat){
        if (err || stat.isDirectory()) { res.writeHead(404, "File not found"); res.end(); return }
        var stream = fs.createReadStream(filename);
        stream.pipe(res);
    });
}

var server = http.createServer(function (req, res) {
    if (req.url.slice(0,5) === '/css/' && req.url.indexOf('..') == -1) {
        sendStatic(req, res);
        return;
    }

    var data = url.parse(req.url, true);
    req.params = data.query;
    var doPage = mapping[data.pathname];
    
    if (doPage) {
        if (req.method !== 'POST') {
            doPage(req,res);
            return;
        }

        // from http://blog.frankgrimm.net/2010/11/howto-access-http-message-body-post-data-in-node-js/
        var fullBody = '';

        req.on('data', function(chunk) {
            // append the current chunk of data to the fullBody variable
            fullBody += chunk.toString();
        });
            
        req.on('end', function() {    
            // parse the received body data
            var decodedBody = querystring.parse(fullBody);
            req.params = decodedBody;
            doPage(req,res);
        });
    }
    else {
        res.writeHead(404, { 'Content-type': 'text/plain' });
        res.end("bad URL " + req.url);
    }
    
}).listen(http_port);

console.log('listening to http://localhost:' + http_port);

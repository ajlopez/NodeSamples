
var url = require('url');

exports.loadParams = function(req, res, next) {
    req.requrl = url.parse(req.url, true);
    req.a = (req.requrl.query.a && !isNaN(req.requrl.query.a))
        ? new Number(req.requrl.query.a)
        : NaN;
    req.b = (req.requrl.query.b && !isNaN(req.requrl.query.b))
        ? new Number(req.requrl.query.b)
        : NaN;
        
    if (next) next();
}

exports.navbar = function() {
    return ["<div class='navbar'>",
        "<p><a href='/'>Home</a></p>",
        "</div>"].join('\n');
}

exports.page = function(title, navbar, content) {
    return ["<html><head><title>{title}</title></head>",
        "<body><h1>{title}</h1>",
        "<table><tr>",
        "<td>{navbar}</td><td>{content}</td>",
        "</tr></table></body></html"
    ].join('\n')
    .replace("{title}", title, "g")
    .replace("{navbar}", navbar, "g")
    .replace("{content}", content, "g");
}
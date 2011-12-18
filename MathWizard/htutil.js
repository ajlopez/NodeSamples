
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


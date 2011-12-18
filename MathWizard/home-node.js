
htutil = require('./htutil.js');

exports.get = function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html' });
    res.end(
        htutil.page("Home", htutil.navbar(),
        "<p>InitialPage</p>")
    );
}

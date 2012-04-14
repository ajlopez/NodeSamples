var connect = require('connect');
var app = connect()
	.use(connect.logger())
	.use(connect.favicon())
	.use(function(req, res) {
		res.write('<h1>Hello, world!</h1>');
		res.end();
	});
	
app.listen(3000);
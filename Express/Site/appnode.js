var express = require('express');
var htutil  = require('./htutil');

var app = express();

app
  .use(express.favicon())
  .use(express.logger())
  .use('/content', express.static(__dirname + '/content'))
  .use(app.router);

app.get('/', 
  require('./home-node').get);
app.get('/square', htutil.loadParams,
  require('./square-node').get);
app.get('/factorial', htutil.loadParams,
  require('./fact-node').get);
app.get('/fibonacci', htutil.loadParams,
  require('./fibo-node').get);
app.get('/fibonacciasync', htutil.loadParams,
  require('./fiboa-node').get);
app.get('/mult', htutil.loadParams,
  require('./mult-node').get);
  
app.listen(8124);
  
console.log('listening to http://localhost:8124');

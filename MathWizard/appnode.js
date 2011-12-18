
var http_port = 8124;

var http = require('http');
var htutil = require('./htutil.js');

var mapping = {};

mapping['/'] = require('./home-node');
mapping['/square'] = require('./square-node');


var Stomp = require('stomp-client');
var queue = '/queue/tasks';
var tempq = '/temp-queue/t' + Math.floor(Math.random() * 10000);
var fs = require('fs');

var client = new Stomp('127.0.0.1', 61613, null, null);
client.connect(function(sessionId) {
    console.log('connected');
    client.subscribe(tempq, function(body, headers) {
        console.log("headers");
        console.dir(headers);
        console.log("body");
        console.log(body);
    });
    
    client.publish(queue, "Hello, World!", { "reply-to": tempq });
},
    function (err) {
        console.log(err);
    }
);
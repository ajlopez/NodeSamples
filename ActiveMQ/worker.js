var Stomp = require('stomp-client');
var queue = '/queue/tasks';
var tempq = '/temp-queue/t1234';
var fs = require('fs');

var client = new Stomp('127.0.0.1', 61613, null, null);
client.connect(function(sessionId) {
    console.log('connected');
    client.subscribe(queue, function(body, headers) {
        console.log("headers");
        console.dir(headers);
        console.log("body");
        console.log(body);
        
        if (headers["reply-to"])
            client.publish(headers["reply-to"], body.toLowerCase());
    });
},
    function (err) {
        console.log(err);
    }
);
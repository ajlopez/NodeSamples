
var domain = process.env.SLACK_DOMAIN;
var token = process.env.SLACK_TOKEN;
var username = process.env.SLACK_USER;

var Slack = require('node-slack');
var slack = new Slack(domain, token);

var channel = process.argv[2];
var message = process.argv[3];

console.log('Sending message', message, 'to channel', channel);

slack.send({
    text: message,
    channel: '#' + channel,
    username: username
});

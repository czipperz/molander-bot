const HTTPS = require('https');
const cool = require('cool-ascii-faces');
const sleep = require('sleep');

const botID = process.env.BOT_ID;

function respond() {
    const request = JSON.parse(this.req.chunks[0]);
    const botRegex = /^Hey Farkas,/;

    if (request.text && botRegex.test(request.text)) {
        this.res.writeHead(200);
        postMessage();
        this.res.end();
    } else {
        console.log("Message ignored");
        this.res.writeHead(200);
        this.res.end();
    }
}

function postMessage() {
    const botResponse = cool();

    const options = {
        hostname: 'api.groupme.com',
        path: '/v3/bots/post',
        method: 'POST'
    };

    const body = {
        "bot_id": botID,
        "text": botResponse
    };

    sleep.msleep(500);

    console.log('sending ' + botResponse + ' to ' + botID);

    const botReq = HTTPS.request(options, function(res) {
        if (res.statusCode == 202) {
            //neat
        } else {
            console.log('rejecting bad status code ' + res.statusCode);
        }
    });

    botReq.on('error', function(err) {
        console.log('error posting message ' + JSON.stringify(err));
    });
    botReq.on('timeout', function(err) {
        console.log('timeout posting message ' + JSON.stringify(err));
    });
    botReq.end(JSON.stringify(body));
}


module.exports = {
    respond
};
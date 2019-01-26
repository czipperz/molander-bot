const HTTPS = require('https');
const cool = require('cool-ascii-faces');
const sleep = require('sleep');

const BOT_ID = process.env.BOT_ID;
const TEST_BOT_ID = process.env.TEST_BOT_ID;

function respond() {
    const request = JSON.parse(this.req.chunks[0]);
    const botRegex = /^\/molander/;
    const testRegex = /^\/test/;

    if (request.text && botRegex.test(request.text)) {
        if (botRegex.test(request.text)) {
            this.res.writeHead(200);
            postMessage(BOT_ID);
            this.res.end();
        } else if (testRegex.test(request.text)) {
            this.res.writeHead(200);
            postMessage(TEST_BOT_ID);
            this.res.end();
        }
    } else {
        console.log("Message ignored");
        this.res.writeHead(200);
        this.res.end();
    }
}

function postMessage(botID) {
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

    sleep.sleep(2);

    console.log('sending ' + botResponse + ' to ' + botID);

    const botReq = HTTPS.request(options, function(res) {
        if (res.statusCode == 202) {
            // neat
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
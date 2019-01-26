const HTTPS = require('https');
const cool = require('cool-ascii-faces');
const sleep = require('sleep');

const commands = require('./src/commands');

const BOT_ID = process.env.BOT_ID;
const TEST_BOT_ID = process.env.TEST_BOT_ID;

function respond() {
    const request = JSON.parse(this.req.chunks[0]);

    const botRegex = /^\/molander/;
    const testRegex = /^\/test/;

    sleep.sleep(2);

    console.log('Received Event', JSON.stringify(request));

    if (request.text) {
        let id;
        if (botRegex.test(request.text)) {
            id = BOT_ID;
        } else if (testRegex.test(request.text)) {
            id = TEST_BOT_ID;
        }
        postMessage(this.req, this.res, id, cool());

        console.log('Commands:', JSON.stringify(commands));
    } else {
        console.log("Message ignored");
        this.res.writeHead(200);
        this.res.end();
    }
}

function postMessage(request, response, botID, botResponse) {
    response.writeHead(200);

    const options = {
        hostname: 'api.groupme.com',
        path: '/v3/bots/post',
        method: 'POST'
    };

    const body = {
        "bot_id": botID,
        "text": botResponse
    };

    console.log('Sending ' + botResponse + ' to ' + botID);

    const botReq = HTTPS.request(options, function(res) {
        if (res.statusCode == 202) {
            // neat
            console.log('POST successful');
        } else {
            console.log('Rejecting bad status code ' + res.statusCode);
        }
    });

    botReq.on('error', function(err) {
        console.log('error posting message ' + JSON.stringify(err));
    });
    botReq.on('timeout', function(err) {
        console.log('timeout posting message ' + JSON.stringify(err));
    });
    botReq.end(JSON.stringify(body));
    
    response.end();
}


module.exports = {
    respond
};

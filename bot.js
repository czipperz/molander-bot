const HTTPS = require('https');
const cool = require('cool-ascii-faces');
const sleep = require('sleep');

const commands = require('./src/commands');

function respond() {
    const request = JSON.parse(this.req.chunks[0]);

    sleep.sleep(2);

    console.log('Received Event', JSON.stringify(request));

    if (request.text) {
        respondTo(request.text, function (id, message) {
            postMessage(this.req, this.res, id, message);
        });

        console.log('Commands:', JSON.stringify(commands));
    } else {
        console.log("Message ignored");
        this.res.writeHead(200);
        this.res.end();
    }
}

function respondTo(text, post) {
    const bots = [{ regex: /^\/molander/, id: process.env.BOT_ID },
                  { regex: /^\/test/, id: process.env.TEST_BOT_ID }];

    for (const bot of bots) {
        if (bot.regex.test(text)) {
            post(bot.id, cool());
        }
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

const HTTPS = require('https');
const sleep = require('sleep');

const commands = require('./commands');

function respond() {
    const request = JSON.parse(this.req.chunks[0]);

    sleep.sleep(2);

    console.log('Received Event', JSON.stringify(request));

    if (request.text) {
        const req = this.req;
        const res = this.res;
        respondTo(request.text, function (id, message) {
            postMessage(req, res, id, message);
        });
    } else {
        console.log("Message ignored");
        this.res.writeHead(200);
        this.res.end();
    }
}

async function respondTo(text, post) {
    const bots = [{ name: "/molander", id: process.env.BOT_ID },
                  { name: "@molander-bot", id: process.env.BOT_ID },
                  { name: "/test", id: process.env.TEST_BOT_ID }];

    for (const bot of bots) {
        if (text.startsWith(bot.name)) {
            const withoutName = text.substring(bot.name.length).trim();
            const message = await parseCommand(withoutName);
            post(bot.id, message);
        }
    }
}

async function parseCommand(text) {
    for (const command of commands.commands) {
        if (command.commandRegex.test(text)) {
            return command.processCommand(text);
        }
    }
    console.log("Unrecognized command issued: " + text);
}

function makeBody(botID, message) {
    if (typeof message === 'string') {
        return {
            "bot_id": botID,
            "text": message
        };
    } else {
        message.bot_id = botID;
        return message;
    }
}

function postMessage(request, response, botID, botResponse) {
    response.writeHead(200);

    const options = {
        hostname: 'api.groupme.com',
        path: '/v3/bots/post',
        method: 'POST'
    };

    const body = makeBody(botID, botResponse);

    console.log('Sending ' + JSON.stringify(body, null, 4));

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
    respond,
    respondTo
};

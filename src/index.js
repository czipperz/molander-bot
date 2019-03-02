const http = require('http');
const director = require('director');
const bot = require('./bot.js');

const router = new director.http.Router({
    '/': {
        post: bot.respond,
        get: ping
    }
});

const server = http.createServer(function(req, res) {
    req.chunks = [];
    req.on('data', function(chunk) {
        req.chunks.push(chunk.toString());
    });

    router.dispatch(req, res, function(err) {
        res.writeHead(err.status, {
            "Content-Type": "text/plain"
        });
        res.end(err.message);
    });
});

const port = Number(process.env.PORT || 5000);
server.listen(port);

function ping() {
    this.res.writeHead(200);
    this.res.end("Hey, I'm molander-bot.");
}
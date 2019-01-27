const bot = require('./bot');

function messagePrintable(message) {
    return JSON.stringify(message, null, 4);
}

bot.respondTo("/molander-help", function (id, message) {
    console.log("Error: /molander-help shouldn't callback");
});

bot.respondTo("/molander", function (id, message) {
    console.log(id + " says '" + message + "' (expected a meme)");
});

bot.respondTo("/molander help", function (id, message) {
    console.log(id + " says '" + messagePrintable(message) + "' (expected help text)");
});
bot.respondTo("/test help", function (id, message) {
    console.log(id + " says '" + messagePrintable(message) + "' (expected help text)");
});

bot.respondTo("/molander infidels have stormed the castle!", function (id, message) {
    console.log(id + " says '" + messagePrintable(message) + "' (expected image)");
});
bot.respondTo("/test look, infidels are coming over the gates!", function (id, message) {
    console.log(id + " says '" + messagePrintable(message) + "' (expected image)");
});

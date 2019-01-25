const bot = require('./bot');

bot.respondTo("/molander-help", function (id, message) { console.log("Error: /molander-help"); });
bot.respondTo("/molander", function (id, message) { console.log(id + " says '" + message + "'"); });
bot.respondTo("/molander help", function (id, message) { console.log(id + " says '" + message + "'"); });
bot.respondTo("/test help", function (id, message) { console.log(id + " says '" + message + "'"); });

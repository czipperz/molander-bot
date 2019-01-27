const cool = require('cool-ascii-faces');
const commandRegex = /^\s*$/;

function processCommand(command) {
    return cool();
}

module.exports = {
	commandRegex,
	processCommand
};

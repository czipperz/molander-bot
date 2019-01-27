const cool = require('cool-ascii-faces');
const commandRegex = /.*/;

function processCommand(command) {
    return cool();
}

module.exports = {
	commandRegex,
	processCommand
};

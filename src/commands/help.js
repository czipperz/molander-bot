const commandRegex = /^help/;

function processCommand(command) {
    return { text: 'I\'ll help out eventually' };
}

module.exports = {
	commandRegex,
	processCommand
};

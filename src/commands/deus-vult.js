const commandRegex = /infidels.*\!$/;

function processCommand(command) {
    return {
        attachments: [
            {
                type: "image",
                url: "https://ih0.redbubble.net/image.297633040.5334/flat,550x550,075,f.u2.jpg"
            }
        ]
    };
}

module.exports = {
	commandRegex,
	processCommand
};

const commandRegex = /(infidel|crusade|heretic)/;

function processCommand(command) {
    const images = [
        "https://ih0.redbubble.net/image.297633040.5334/flat,550x550,075,f.u2.jpg",
        "https://i.kym-cdn.com/photos/images/newsfeed/001/176/880/239.jpg",
    ];
    return {
        attachments: [
            {
                type: "image",
                url: images[Math.floor(Math.random() * images.length)],
            }
        ]
    };
}

module.exports = {
	commandRegex,
	processCommand
};

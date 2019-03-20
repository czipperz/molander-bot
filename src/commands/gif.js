const axios = require('axios');

const commandRegex = /.*/;

const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

async function processCommand(command) {
    let message;
    if (command.startsWith(/^gif\s+/)) {
        message = command.substring('gif'.length).trim();
    } else {
        message = command;
    }
    const api_key = process.env.GIPHY_API_KEY;

    const opts = { json: true };

    try {
        const response =
            await axios.get(`https://api.giphy.com/v1/gifs/translate?api_key=${api_key}&s=${message}`);
            
        return response.data.data.images.fixed_height.url;
    } catch (e) {
        console.log('Error fetching gif:', e);
        return;
    }
}

module.exports = {
	commandRegex,
	processCommand
};

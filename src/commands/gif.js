const axios = require('axios');

const commandRegex = /^gif/;

const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

async function processCommand(command) {
    const tag = command.substring('gif'.length).trim();
    const rating = getRandomElement(['Y', 'G', 'PG', 'PG13', 'R']);
    const api_key = process.env.GIPHY_API_KEY;

    const opts = { json: true };

    try {
        const response =
            await axios.get(`https://api.giphy.com/v1/gifs/random?api_key=${api_key}&tag=${tag}&rating=${rating}`);
        const gifUrl = response.data.image_original_url;
        console.log('Giphy url:', gifUrl);
        return gifUrl;
    } catch (e) {
        console.log('Error fetching gif:', e);
        return;
    }
}

module.exports = {
	commandRegex,
	processCommand
};

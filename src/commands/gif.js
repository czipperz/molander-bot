const xhr = require('xhr');

const commandRegex = /^gif/;

const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

function processCommand(command) {
    const tag = command.substring('gif'.length).trim();
    const rating = getRandomElement(['Y', 'G', 'PG', 'PG13', 'R']);
    const api_key = process.env.GIPHY_API_KEY;

    return xhr.get(`https://api.giphy.com/v1/gifs/random?api_key=${api_key}&tag=${tag}&rating=${rating}`, (err, resp) => {
        if (err) {
            console.log('Error when requesting gif', err);
        }

        console.log('Giphy response:', resp.body);
        return resp.body;
    });
}

module.exports = {
	commandRegex,
	processCommand
};

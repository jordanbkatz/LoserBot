const axios = require('axios');
module.exports = {
    name: "kanye",
    description: "get random Kanye quote",
    execute(Discord, bot, message, args) {
        axios.get("https://api.kanye.rest/").then(function(response) {
            message.channel.send(`"${response.data.quote}" - Kanye`);
        }).catch(function(err) {
            message.channel.send(err);
        });
    }
};
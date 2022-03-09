const axios = require('axios');
module.exports = {
    description: "get Kanye quote",
    usage: [
        "$loser kanye"
    ],
    execute: async function(Model, Discord, bot, message, args) {
        axios.get("https://api.kanye.rest/").then(function(response) {
            message.channel.send(`"${response.data.quote}" - Kanye`);
        }).catch(function(err) {
            message.channel.send("Failed to fetch Kanye quote");
        });
    }
};
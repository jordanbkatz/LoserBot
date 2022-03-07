const axios = require('axios');
module.exports = {
    description: "get Hitler quote",
    usage: [
        "$loser hitler"
    ],
    execute: async function(Discord, bot, message, args) {
        axios.get("https://hitler-api.herokuapp.com").then(function(response) {
            message.channel.send(`"${response.data}" - Hitler`);
        }).catch(function(err) {
            message.channel.send("Failed to fetch Hitler quote");
            console.log(err);
        });
    }
};
const axios = require('axios');
module.exports = function(Discord, bot, message, args) {
    axios.get("https://hitler-api.herokuapp.com").then(function(response) {
        message.channel.send(`"${response.data}" - Hitler`);
    }).catch(function(error) {
        message.channel.send(err);
    });
}
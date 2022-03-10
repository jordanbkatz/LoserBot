const axios = require('axios');
module.exports = async function(Model, Discord, bot, message, args) {
  const response = new Discord.MessageEmbed();
  axios.get("https://hitler-api.herokuapp.com").then(function(res) {
    response.setTitle(`"${res.data}" - Hitler`);
  }).catch(function(err) {
    response.setTitle("Failed to fetch Hitler quote");
  }).finally(function() {
    message.channel.send(response);
  });
};

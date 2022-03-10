const axios = require('axios');
module.exports = async function(Model, Discord, bot, message, args) {
  const response = new Discord.MessageEmbed();
  axios.get("https://api.kanye.rest/").then(function(res) {
    response.setTitle(`"${res.data.quote}" - Kanye`);
  }).catch(function(err) {
    response.setTitle("Failed to fetch Kanye quote");
  }).finally(function() {
    message.channel.send(response);
  });
};

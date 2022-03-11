const axios = require('axios');
module.exports = async function(Model, Discord, bot, message, args) {
  const response = new Discord.MessageEmbed();
  try {
    const quote = await axios.get("https://hitler-api.herokuapp.com");
    response.setTitle(`"${quote.data}" - Hitler`);
  }
  catch (err) {
    console.log(err.message);
    response.setTitle("Failed to fetch Hitler quote");
  }
  finally {
    return response;
  }
};

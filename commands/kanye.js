const axios = require('axios');
module.exports = async function(Member, Discord, bot, message, args) {
  const response = new Discord.MessageEmbed();
  try {
    const quote = await axios.get("https://api.kanye.rest/");
    response.setTitle("Kanye");
    response.setDescription(`"${quote.data.quote}"`);
  }
  catch (err) {
    console.log(err.message);
    response.setTitle("Error!");
  }
  finally {
    return response;
  }
};

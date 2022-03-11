const axios = require('axios');
module.exports = async function(Member, Discord, bot, message, args) {
  const response = new Discord.MessageEmbed();
  try {
    const quote = await axios.get("https://api.kanye.rest/");
    response.setTitle(`"${quote.data.quote}" - Kanye`);
  }
  catch (err) {
    console.log(err.message);
    response.setTitle("Failed to fetch Kanye quote");
  }
  finally {
    return response;
  }
};

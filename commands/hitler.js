const axios = require('axios');
module.exports = async function (Model, Discord, bot, message, args) {
  const response = new Discord.MessageEmbed();
  try {
    const quote = await axios.get("https://hitler-api.herokuapp.com");
    response.setTitle("Hitler");
    response.setDescription(`"${quote.data}"`);
  }
  catch (err) {
    console.log(err.message);
    response.setTitle("Error!");
  }
  finally {
    return response;
  }
};

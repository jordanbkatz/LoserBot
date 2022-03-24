const axios = require('axios');
module.exports = async function (Member, Discord, bot, message, args) {
  const response = new Discord.MessageEmbed();
  try {
    const joke = await axios.get("https://v2.jokeapi.dev/joke/Dark");
    response.setTitle(joke.data.setup);
    response.setDescription(joke.data.delivery);
  }
  catch (err) {
    console.log(err.message);
    response.setTitle("Error!");
  }
  finally {
    return response;
  }
};

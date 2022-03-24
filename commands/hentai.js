const akaneko = require('akaneko');
module.exports = async function (Member, Discord, bot, message, args) {
  const response = new Discord.MessageEmbed();
  let error = true;
  if (args[0]) {
    try {
      const image = await akaneko.nsfw[args[0]]();
      response.setImage(image);
      error = false;
    }
    catch (err) {
      console.log(err.message);
    }
  }
  if (error) {
    response.setTitle("Error!");
  }
  return response;
};

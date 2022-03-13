const mathjs = require('mathjs');
module.exports = async function (Member, Discord, bot, message, args) {
  const response = new Discord.MessageEmbed();
  let error = true;
  if (args[0]) {
    try {
      const result = mathjs.evaluate(args.join(' '));
      response.setTitle(result);
    }
    catch (err) {
      response.setTitle(err.message);
    }
    error = false;
  }
  if (error) {
    response.setTitle("Error!");
  }
  return response;
};

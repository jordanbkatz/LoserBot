const mathjs = require('mathjs');
module.exports = async function(Model, Discord, bot, message, args) {
  const response = new Discord.MessageEmbed();
  if (args[0]) {
    try {
      const result = mathjs.evaluate(args.join(' '));
      response.setTitle(result);
    }
    catch (err) {
      response.setTitle("Failed to evaluate mathematical expression");
    }
    finally {
      message.channel.send(response);
    }
  }
};

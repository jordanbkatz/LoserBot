const mathjs = require('mathjs');
module.exports = async function(Member, Discord, bot, message, args) {
  const response = new Discord.MessageEmbed();
  if (args[0]) {
    try {
      const result = mathjs.evaluate(args.join(' '));
      response.setTitle(result);
    }
    catch (err) {
      console.log(err.message);
      response.setTitle("Failed to evaluate mathematical expression");
    }
  }
  else {
    response.setTitle("Please enter mathematical expression");
  }
  return response;
};

module.exports = async function(Model, Discord, bot, message, args) {
  const response = new Discord.MessageEmbed();
  response.setTitle("Here is a list of all `$loser` commands:");
  let names = [];
  for (const name of bot.commands.keys()) {
    names.push(`\`${name}\``);
  }
  response.setDescription(names.join(', '));
  return response;
};

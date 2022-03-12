module.exports = async function(Model, Discord, bot, message, args) {
  const response = new Discord.MessageEmbed();
  let error = true;
  const member = message.mentions.users.first();
  if (member && message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
    const memberTarget = message.guild.members.cache.get(member.id);
    try {
      await memberTarget.ban();
      response.setTitle("Banned user!");
      error = false;
    }
    catch (err) {
      console.log(err.message);
    }
  }
  if (error) {
    reponse.setTitle("Error!");
  }
  return response;
};

module.exports = async function(Member, Discord, bot, message, args) {
  const response = new Discord.MessageEmbed();
  if (message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
    const user = message.mentions.users.first();
    const member = message.guild.members.cache.get(user.id);
    try {
      await member.kick();
      response.setTitle("Kicked member");
    }
    catch (e) {
      console.log(e.message);
      response.setTitle("Failed to kick member");
    }
  }
  else {
    response.setTitle("You do not have the permissions to use this command");
  }
  return response;
};

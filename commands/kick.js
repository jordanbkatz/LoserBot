module.exports = async function (Member, Discord, bot, message, args) {
  const response = new Discord.MessageEmbed();
  let error = true;
  if (message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
    const user = message.mentions.users.first();
    const member = message.guild.members.cache.get(user.id);
    try {
      await member.kick();
      response.setTitle("Kicked member");
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

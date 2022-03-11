module.exports = async function(Model, Discord, bot, message, args) {
  const response = new Discord.MessageEmbed();
  const member = message.mentions.users.first();
  if (!message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
    response.setTitle("You do not have the permissions to use this command");
    message.channel.send(response);
  }
  else {
    const memberTarget = message.guild.members.cache.get(member.id);
    memberTarget.ban();
  }
};

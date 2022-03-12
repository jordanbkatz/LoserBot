module.exports = async function(Member, Discord, bot, message, args) {
  const response = new Discord.MessageEmbed();
  let error = true;
  if (message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
    if (message.mentions.users.first() && args[0]) {
      const member = message.mentions.users.first();
      switch(args[0]) {
        case "on":
          try {
            await Member.findOneAndUpdate(
              { user: member.id, guild: message.guild.id },
              { ignore: true }
            );
            response.setTitle("Ignore status turned on");
            error = false;
          }
          catch (err) {
            console.log(err.message);
          }
          break;
        case "off":
          try {
            await Member.findOneAndUpdate(
              { user: member.id, guild: message.guild.id },
              { ignore: false }
            );
            response.setTitle("Ignore status turned off");
            error = false;
          }
          catch (err) {
            console.log(err.message);
          }
          break;
        default:
      }
    }
  }
  if (error) {
    response.setTitle("Error!");
  }
  return response;
};

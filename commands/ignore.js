module.exports = async function(Member, Discord, bot, message, args) {
  const response = new Discord.MessageEmbed();
  if (!message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
    response.setTitle("You do not have the permissions to use this command");
    message.channel.send(response);
  }
  else {
    if (args[0] && message.mentions.users.first()) {
      const member = message.mentions.users.first();
      switch(args[0]) {
        case "on":
          Member.findOneAndUpdate(
            { user: member.id, guild: message.guild.id },
            { ignore: true },
            function(err, res) {
              if (err) {
                console.log(err);
              };
            }
          );
          break;
        case "off":
          Member.findOneAndUpdate(
            { user: member.id, guild: message.guild.id },
            { ignore: false },
            function(err, res) {
              if (err) console.log(err);
            }
          );
          break;
        default:
      }
    }
  }
};

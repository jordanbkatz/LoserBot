module.exports = async function (Member, Discord, bot, message, args) {
  const response = new Discord.MessageEmbed();
  if (message.mentions.users.first()) {
    const user = message.mentions.users.first();
    try {
      const member = await Member.findOne({ user: user.id, guild: message.guild.id });
      response.setTitle(`${user.username}#${user.discriminator}`);
      response.setDescription(`${member.xp}xp`);
    }
    catch (err) {
      console.log(err.message);
      response.setTitle("Error!");
    }
  }
  else {
    const members = await Member.find({ guild: message.guild.id }).sort({ xp: -1 });
    for (let i = 0; i < members.length; i++) {
      const member = await bot.users.fetch(members[i].user);
      response.addField(`${i + 1}: ${member.username}#${member.discriminator}`, `${members[i].xp.toLocaleString()}xp`);
    }
  }
  return response;
};

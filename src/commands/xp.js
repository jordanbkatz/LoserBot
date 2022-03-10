module.exports = async function(Model, Discord, bot, message, args) {
  const msgEmbed = new Discord.MessageEmbed();
  if (message.mentions.users.first()) {
    const member = message.mentions.users.first();
    Model.findOne(
      { user: member.id, guild: message.guild.id },
      function(err, res) {
        msgEmbed
          .setTitle(`${member.username} #${member.discriminator}`)
          .setDescription(`${res.xp}xp`);
        message.channel.send(msgEmbed);
      }
    );
  }
  else {
    const res = await Model.find({ guild: message.guild.id }).sort({ xp: -1 });
    for (let i = 0; i < res.length; i++) {
      const member = await bot.users.fetch(res[i].user);
      msgEmbed.addField(`${i + 1}: ${member.username} #${member.discriminator}`, `${res[i].xp.toLocaleString()}xp`);
    }
    message.channel.send(msgEmbed);
  }
};

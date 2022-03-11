module.exports = async function(Model, Discord, bot, message, args) {
  const response = new Discord.MessageEmbed();
  if (args[0]) {
    const amount = parseInt(args[0]);
    if (amount > 0 && amount < 100) {
      message.channel.bulkDelete(amount + 1).catch(function(err) {
        response.setTitle("Failed to delete messages");
        message.channel.send(response);
      });
    }
    else {
      response.setTitle("Number of messages to delete must be between 0 and 100");
      message.channel.send(response);
    }
  }
};

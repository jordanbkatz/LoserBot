module.exports = async function (Model, Discord, bot, message, args) {
  const response = new Discord.MessageEmbed();
  let error = true;
  if (args[0]) {
    const amount = parseInt(args[0]);
    if (amount > 0 && amount < 100) {
      try {
        await message.channel.bulkDelete(amount + 1);
        response.setTitle(`Deleted ${amount} messages`);
        error = false;
      }
      catch (err) {
        console.log(err.message);
      }
    }
  }
  if (error) {
    response.setTitle("Error!");
  }
  return response;
};

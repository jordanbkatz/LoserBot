module.exports = async function (Member, Discord, bot, message, args) {
  const response = new Discord.MessageEmbed();
  if (args[0] && args[1]) {
    const min = parseInt(args[0]);
    const max = parseInt(args[1]);
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    response.setTitle(random);
  }
  else {
    response.setTitle("Error!");
  }
  return response;
};

module.exports = async function (Model, Discord, bot, message, args) {
  const response = new Discord.MessageEmbed();
  response.setTitle("Need help?");
  response.setURL("https://github.com/jordanbkatz/LoserBot/blob/master/README.md");
  return response;
};

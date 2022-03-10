const axios = require('axios');
module.exports = async function(Model, Discord, bot, message, args) {
  const response = new Disocrd.MessageEmbed();
  const limit = parseInt(args[0]) || 100;
  axios.get(`https://www.reddit.com/r/dankmemes/hot/.json?limit=${limit}`).then(function(response) {
    const allowed = response.data.data.children.filter(function(meme) {
      return meme.data.post_hint == "image";
    });
    const meme = allowed[Math.floor(Math.random() * (limit - 1)) + 1].data;
    response
      .setTitle(meme.title)
      .setImage(meme.preview.images[0].source.url.replace("amp;s", "s"));
  }).catch(function(err) {
    response.setTitle("Failed to fetch meme");
  }).finally(function() {
    message.channel.send(response);
  });
};

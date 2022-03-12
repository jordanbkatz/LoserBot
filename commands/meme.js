const axios = require('axios');
module.exports = async function(Member, Discord, bot, message, args) {
  const response = new Discord.MessageEmbed();
  const limit = parseInt(args[0]) || 100;
  try {
    quote = await axios.get(`https://www.reddit.com/r/dankmemes/hot/.json?limit=${limit}`);
    const allowed = quote.data.data.children.filter(function(meme) {
      return meme.data.post_hint == "image";
    });
    const meme = allowed[Math.floor(Math.random() * (limit - 1)) + 1].data;
    response.setTitle(meme.title);
    response.setImage(meme.preview.images[0].source.url.replace("amp;s", "s"));
  }
  catch (err) {
    console.log(err.message);
    response.setTitle("Error!");
  }
  finally {
    return response;
  }
};

const axios = require('axios');
module.exports = {
    description: "get meme from r/dankmemes subreddit",
    usage: [
        "$loser meme",
        "$loser meme <limit>"
    ],
    execute: async function(Model, Discord, bot, message, args) {
        const limit = parseInt(args[0]) || 100;
        axios.get(`https://www.reddit.com/r/dankmemes/hot/.json?limit=${limit}`).then(function(response) {
            const allowed = response.data.data.children.filter(function(meme) {
                return meme.data.post_hint = "image";
            });
            const meme = allowed[Math.floor(Math.random() * (limit - 1)) + 1].data;
            const msgEmbed = new Discord.MessageEmbed()
                .setTitle(meme.title)
                .setImage(meme.preview.images[0].source.url.replace("amp;s", "s"));
            message.channel.send(msgEmbed); 
        }).catch(function(err) {
            message.channel.send("Failed to fetch meme");
        });
    }
};
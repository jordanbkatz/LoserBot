(require('dotenv')).config();
const Discord = require('discord.js');
const bot = new Discord.Client({intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_MEMBERS"
]});
["commands", "events"].forEach(function(handler) {
    bot[handler] = new Discord.Collection();
    require(`./handlers/${handler}`)(Discord, bot);
});
bot.login(process.env.DISCORD_TOKEN);
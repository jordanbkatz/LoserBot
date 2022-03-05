require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
const intents = new Discord.Intents(32767);
const bot = new Discord.Client({ intents });
const prefix = "$loser";
bot.commands = new Discord.Collection();
const files = fs.readdirSync(path.join(__dirname, "commands"));
for (const file of files) {
    const command = require(`./commands/${file}`);
    bot.commands.set(file.split('.')[0], command);
}
bot.on("ready", function() {
    console.log(`Logged in as ${bot.user.tag}!`);
});
bot.on("message", async function(message) {
    if (message.content.startsWith(prefix) && !message.author.bot) {
        let args = message.content.split(/\s+/);
        args.shift();
        let command = bot.commands.get(args[0]);
        args.shift();
        if (!command) {
            command = bot.commands.get("invalid");
        }
        command(Discord, bot, message, args);
    }
});
bot.login(process.env.DISCORD_TOKEN);
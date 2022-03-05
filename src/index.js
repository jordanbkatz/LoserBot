(require('dotenv')).config();
const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
const bot = new Discord.Client({intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_MEMBERS"
]});
const prefix = "$loser";
bot.commands = new Discord.Collection();
const dir = path.join(__dirname, "commands");
const files = fs.readdirSync(dir);
for (const file of files) {
    const command = require(`./commands/${file}`);
    bot.commands.set(file.split('.')[0], command);
}
bot.on("ready", function() {
    if (!bot.user || !bot.application) return;
    console.log(`Logged in as ${bot.user.tag}!`);
});
bot.on("messageCreate", async function(message) {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    let args = message.content.split(/\s+/);
    args.shift();
    let command = bot.commands.get(args[0]);
    if (!command) {
        command = bot.commands.get("invalid");
    }
    command(Discord, bot, message, args);
});
bot.login(process.env.DISCORD_TOKEN);
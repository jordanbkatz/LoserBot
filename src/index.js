require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, function() {
    console.log("Connected to database!");
});
const Schema = mongoose.model("users", new mongoose.Schema({
    user: { type: String },
    xp: { type: Number, default: 0 }
}));
const intents = new Discord.Intents(32767);
const bot = new Discord.Client({ intents });
const prefix = "$loser";
const cooldown = 3;
let last = Date.now();
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
        if ((Date.now() - last) / 1000 >= cooldown) {
            let args = message.content.split(/\s+/);
            args.shift();
            let command = bot.commands.get(args[0]);
            args.shift();
            try {
                command.execute(Discord, bot, message, args);
            }
            catch(err) {
                message.channel.send("Invalid command");
                console.log(err);
            }
            last = Date.now();
        }
        else {
            const timeRemaining = ((cooldown * 1000 + last) - Date.now()) / 1000;
            message.channel.send(`Wait ${timeRemaining} seconds for cooldown to end`);
        }
    }
});
bot.login(process.env.DISCORD_TOKEN);
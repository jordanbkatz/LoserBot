require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, function() {
    console.log("Connected to database!");
});
const Schema = new mongoose.Schema({
    user: String,
    guild: String,
    xp: Number,
    ignore: Boolean
});
const Model = mongoose.model("user", Schema);
const Discord = require('discord.js');
const intents = new Discord.Intents(32767);
const bot = new Discord.Client({ intents });
const prefix = "$loser";
const cooldown = 3;
let last = Date.now();
bot.commands = new Discord.Collection();
const fs = require('fs');
const path = require('path');
const files = fs.readdirSync(path.join(__dirname, "commands"));
for (const file of files) {
    const command = require(`./commands/${file}`);
    bot.commands.set(file.split('.')[0], command);
}
bot.on("ready", function() {
    console.log(`Logged in as ${bot.user.tag}!`);
});
bot.on("message", async function(message) {
    if (message.author.bot) return;
    Model.findOne(
        { user: message.author.id },
        async function(err, res) {
            if (err) console.log(err);
            if (!res) {
                const author = new Model({
                    user: message.author.id,
                    guild: message.guild.id,
                    xp: 0,
                    ignore: false
                });
                await author.save();
            }
            if (!res || !res.ignore) {
                let gainedXp = 1;
                if (message.content.startsWith(prefix)) {
                    gainedXp = 10;
                    if ((Date.now() - last) / 1000 >= cooldown) {
                        let args = message.content.split(/\s+/);
                        args.shift();
                        let command = bot.commands.get(args[0]);
                        args.shift();
                        if (command) {
                            try {
                                command.execute(Model, Discord, bot, message, args);
                            }
                            catch (err) {
                                message.channel.send("Failed to execute command");
                            }
                        }
                        else {
                            message.channel.send("Invalid command");
                        }
                        last = Date.now();
                    }
                    else {
                        const timeRemaining = ((cooldown * 1000 + last) - Date.now()) / 1000;
                        message.channel.send(`Wait ${timeRemaining} seconds for cooldown to end`);
                    }
                }
                Model.findOneAndUpdate(
                    { user: message.author.id, guild: message.guild.id }, 
                    { $inc: { xp: gainedXp }},
                    function(err, res) {
                        if (err) console.log(err);
                    }
                );
            }
        }
    );
});
bot.login(process.env.DISCORD_TOKEN);
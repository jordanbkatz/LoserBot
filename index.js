require('dotenv').config();
const config = require('./config.json');
const Discord = require('discord.js');
const intents = new Discord.Intents(32767);
const bot = new Discord.Client({ intents });
bot.commands = new Discord.Collection();
const fs = require('fs');
const path = require('path');
const files = fs.readdirSync(path.join(__dirname, "commands"));
for (const file of files) {
  const command = require(`./commands/${file}`);
  bot.commands.set(file.split('.')[0], command);
}
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI).then(function () {
  console.log("Connected to database!");
}).catch(function (err) {
  console.log(err.message);
});
const Member = mongoose.model("member", new mongoose.Schema({
  user: String,
  guild: String,
  xp: Number,
  ignore: Boolean
}));
bot.on("ready", function () {
  console.log(`Logged in as ${bot.user.tag}!`);
});
let last = Date.now();
bot.on("message", async function (message) {
  if (!message.author.bot) {
    const member = await Member.findOne({ user: message.author.id });
    if (!member) {
      const author = new Member({
        user: message.author.id,
        guild: message.guild.id,
        xp: 0,
        ignore: false
      });
      await author.save();
    }
    if (!member || !member.ignore) {
      let gainedXp = 1;
      if (message.content.startsWith(config.prefix)) {
        let response = new Discord.MessageEmbed();
        gainedXp = 10;
        if ((Date.now() - last) / 1000 >= config.cooldown) {
          let args = message.content.split(/\s+/);
          args.shift();
          let command = bot.commands.get(args[0]);
          args.shift();
          if (command) {
            try {
              response = await command(Member, Discord, bot, message, args);
            }
            catch (err) {
              console.log(err.message);
              response.setTitle("Error!");
            }
          }
          else {
            response.setTitle("Error!");
          }
          last = Date.now();
        }
        else {
          const timeRemaining = ((config.cooldown * 1000 + last) - Date.now()) / 1000;
          response.setTitle(`Please wait ${timeRemaining} seconds for cooldown to end`);
        }
        message.channel.send(response);
        try {
          await Member.findOneAndUpdate(
            { user: message.author.id, guild: message.guild.id },
            { $inc: { xp: gainedXp }}
          );
        }
        catch (err) {
          console.log(err.message);
        }
      }
    }
  }
});
bot.login(process.env.DISCORD_TOKEN);

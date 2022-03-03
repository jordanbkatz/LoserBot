(require('dotenv')).config();
import Discord from 'discord.js';
import { Prefix, IntentOptions } from './config';
const bot: Discord.Client = new Discord.Client({ intents: IntentOptions });
bot.on("ready", (): void => {
    if (!bot.user || !bot.application) return;
    console.log(`Logged in as ${bot.user?.tag}!`);
});
bot.on("messageCreate", (msg: Discord.Message): void => {
    if (!msg.content.startsWith(Prefix) || msg.author.bot) return;
    const [cmd, ...args] = msg.content.trim().substring(Prefix.length).split(/\s+/);
    msg.channel.send("im a bot");
});
bot.on("error", (e: Error): void => {
    console.log(`Discord client error`, e);
});
bot.login(process.env.TOKEN);
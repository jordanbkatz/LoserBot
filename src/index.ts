import Discord from 'discord.js';
const client: Discord.Client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});
import { Config } from './config';
try {
    client.login(Config.token);
}
catch(e) {
    console.log(`Login failed: ${e}`);
}
client.on("ready", () => {
    console.log(`Logged in as ${client.user?.tag}!`);
});
client.on("messageCreate", (message: Discord.Message) => {
    if (!message.content.startsWith(Config.prefix) || message.author.bot) return;
    const [cmd, ...args] = message.content.trim().substring(Config.prefix.length).split(/\s+/);
    message.reply("im a bot");
});
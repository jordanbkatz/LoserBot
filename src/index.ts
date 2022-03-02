import Discord from 'discord.js';
const client: Discord.Client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});
const prefix: string = "$loser";
(require('dotenv')).config();
client.login(process.env.TOKEN);
client.on("ready", () => {
    console.log(`Logged in as ${client.user?.tag}!`);
});
client.on("messageCreate", (message: Discord.Message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const [cmd, ...args] = message.content.trim().substring(prefix.length).split(/\s+/);
    message.reply("im a bot");
});
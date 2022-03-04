module.exports = async function(Discord, bot, message) {
    const prefix = "$loser";
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;
    const [cmd, ...args] = msg.content.trim().substring(prefix.length).split(/\s+/);
    const command = bot.commands.get(cmd);
    if (command) {
        command.excecute(Discord, bot, message, args);
    }
    msg.channel.send("im a bot");
};
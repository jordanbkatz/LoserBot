module.exports = {
    execute: async function(Discord, bot, message, args) {
        const msgEmbed = new Discord.MessageEmbed()
            .setTitle("Need help?")
            .setDescription("Here is a list of all `$loser` commands:");
        for (const [name, command] of bot.commands.entries()) {
            if (name !== "help") {
                let value = "";
                for (usage of command.usage) {
                    value += `\`${usage}\`\n`;
                }
                msgEmbed.addField(command.description, value);
            }
        }
        message.channel.send(msgEmbed);
    }
};
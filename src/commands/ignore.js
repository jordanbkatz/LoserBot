module.exports = {
    description: "temporarily suspend user from using the bot",
    usage: [
        "$loser ignore on @<user>",
        "$loser ignore off @<user>"
    ],
    execute: async function(Model, Discord, bot, message, args) {
        if (!message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
            return message.channel.send("You do not have the permissions to use this command");
        }
        if (args[0] && message.mentions.users.first()) {
            const member = message.mentions.users.first();
            switch(args[0]) {
                case "on":
                    Model.findOneAndUpdate(
                        { user: member.id, guild: message.guild.id },
                        { ignore: true },
                        function(err, res) {
                            if (err) {
                                console.log(err);
                            }
                        }
                    );
                    break;
                case "off":
                    Model.findOneAndUpdate(
                        { user: member.id, guild: message.guild.id },
                        { ignore: false },
                        function(err, res) {
                            if (err) {
                                console.log(err);
                            }
                        }
                    );
                    break;
                default:
            }
        }
    }
}
module.exports = {
    description: "ban user",
    usage: [
        "$loser ban @<user>"
    ],
    execute: async function(Model, Discord, bot, message, args) {
        const member = message.mentions.users.first();
        if (!message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
            message.channel.send("You do not have the permissions to use this command");
        }
        else {
            const memberTarget = message.guild.members.cache.get(member.id);
            memberTarget.ban();
        }
    }
};
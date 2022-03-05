module.exports = async function(Discord, bot, message, args) {
    const member = message.mentions.users.first();
    if (member.id == "753007774757027921") {
        message.channel.send("Member is unkickable");
    }
    else if (!message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
        message.channel.send("You do not have the permissions to use this command");
    }
    else {
        message.channel.send("Will kick");
    }
};
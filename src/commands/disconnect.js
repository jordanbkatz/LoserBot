module.exports = async function(Discord, bot, message, args) {
    const vc = message.member.voice.channel;
    if (!vc) {
        message.channel.send("You must be in a voice channel to use this command");
    }
    else {
        await vc.leave();
    }
}
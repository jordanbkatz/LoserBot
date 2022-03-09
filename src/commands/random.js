module.exports = {
    description: "get random number",
    usage: [
        "$loser random <min> <max>"
    ],
    execute: async function(Model, Discord, bot, message, args) {
        if (args[0] && args[1]) {
            const min = parseInt(args[0]);
            const max = parseInt(args[1]);
            const random = Math.floor(Math.random() * (max - min + 1)) + min;
            message.channel.send(random);
        }
    }
};
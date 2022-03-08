module.exports = {
    description: "",
    usage: [
        "$loser random number <min> <max>",
        "$loser random user",
        "$loser random user <role>"
    ],
    execute: async function(Discord, bot, message, args) {
        if (args[0] && args[1]) {
            const min = parseInt(args[0]);
            const max = parseInt(args[1]);
            const random = Math.floor(Math.random() * (max - min + 1)) + min;
            message.channel.send(random);
        }
    }
};
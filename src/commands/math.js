const mathjs = require('mathjs');
module.exports = {
    description: "evaluate mathematical expression",
    usage: [
        "$loser math <expression>"
    ],
    execute: async function (Discord, bot, message, args) {
        if (args[0]) {
            try {
                const result = mathjs.evaluate(args.join(' '));
                message.channel.send(result);
            }
            catch (err) {
                message.channel.send("Failed to evaluate mathematical expression");
            }
        }
    }
};
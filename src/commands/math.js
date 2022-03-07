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
                message.channel.send(`Result: ${result}`);
            }
            catch (err) {
                message.channel.send("Failed to evaluate mathematical expression");
            }
        }
        else {
            message.channel.send("You need to enter a mathematical expression");
        }
    }
};
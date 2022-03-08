module.exports = {
    description: "delete messages",
    usage: [
        "$loser delete <amount>"
    ],
    execute: async function(Discord, bot, message, args) {
        if (args[0]) {
            const amount = parseInt(args[0]);
            if (amount > 0 && amount < 100) {
                try {
                    message.channel.bulkDelete(amount + 1);
                }
                catch (err) {
                    message.channel.send("Failed to delete messages");
                }
            }
            else {
                message.channel.send("Number of messages to delete must be between 0 and 100");
            }
        }
    }
};
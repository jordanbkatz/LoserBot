module.exports = {
    description: "delete messages",
    usage: [
        "$loser delete <amount>"
    ],
    execute: async function(Discord, bot, message, args) {
        let amount = parseInt(args[0]);
        if (!amount) {
            message.channel.send("You need to specify the number of messages you want me to delete");
        }
        else if (amount < 1 || amount > 99) {
            message.channel.send("Number of messages to delete must be between 1 and 99");
        }
        else {
            try {
                message.channel.bulkDelete(++amount);
            }
            catch (err) {
                message.channel.send("Failed to delete messages");
                console.log(err);
            }
        }
    }
};
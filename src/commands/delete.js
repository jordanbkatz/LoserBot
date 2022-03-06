module.exports = async function(Discord, bot, message, args) {
    const amount = parseInt(args[0]);
    if (!amount) {
        message.channel.send("You need to specify the number of messages you want me to delete");
    }
    else if (amount < 1 || amount > 100) {
        message.channel.send("Number of messages to delete must be between 1 and 100");
    }
    else {
        try {
            message.channel.bulkDelete(amount);
        }
        catch (err) {
            message.channel.send("Failed to delete messages");
            console.log(err);
        }
    }
};
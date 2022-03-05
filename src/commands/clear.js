module.exports = async function(Discord, bot, message, args) {
    const amount = parseInt(args[1]);
    if (!amount) {
        message.channel.send("Please specify the number of messages you want me to delete");
    }
    else if (amount < 1 || amount > 100) {
        message.channel.send("Number of messages to delete must be between 1 and 100");
    }
    else {
        message.channel.bulkDelete(amount);
    }
};
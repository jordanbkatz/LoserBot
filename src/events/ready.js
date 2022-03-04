module.exports = function(Discord, bot) {
    if (!bot.user || !bot.application) return;
    console.log(`Logged in as ${bot.user.tag}!`);
};
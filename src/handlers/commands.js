const fs = require('fs');
module.exports = function(Discord, bot) {
    const files = fs.readdirSync('./commands/').filter(function(file) {
        file.endsWith('.js');
    });
    for (const file of files) {
        const command = require(`../commands/${file}`);
        bot.commands.set(command.name, command);
    }
};
const fs = require('fs');
module.exports = function(Discord, bot) {
    const files = fs.readdirSync('./events/').filter(function(file) {
        file.endsWith('.js');
    });
    for (const file of files) {
        const event = require(`../events/${file}`);
        bot.on(file.split('.')[0], event.bind(null, Discord, bot));
    }
};
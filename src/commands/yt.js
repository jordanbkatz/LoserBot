const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
module.exports = async function(Discord, bot, message, args) {
    const vc = message.member.voice.channel;
    if (!vc) {
        message.channel.send("You must be in a voice channel to use this command");
    }
    else if (!args[0]) {
        message.channel.send("You need to specify what you want to play");
    }
    else {
        const connection = await vc.join();
        const videoFinder = async function(query) {
            const result = await ytSearch(query);
            return (result.videos.length > 0) ? result.videos[0] : null;
        }
        const video = await videoFinder(args.join(' '));
        if (video) {
            const stream = ytdl(video.url, { filter: "audioonly" });
            connection.play(stream, { seek: 0, volume: 1 }).on("finish", function() {
                vc.leave();
            });
            message.channel.send(`Playing: ${video.title}`);
        }
        else {
            message.channel.send("No videos found");
        }
    }
}
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
module.exports = {
    description: "play YouTube video audio",
    usage: [
        "$loser yt play <search_query>",
        "$loser yt play <youtube_url>",
        "$loser yt stop"
    ],
    execute: async function(Model, Discord, bot, message, args) {
        const vc = message.member.voice.channel;
        if (!vc) {
            message.channel.send("You must be in a voice channel to use this command");
        }
        if (args[0]) {
            switch(args[0]) {
                case "play":
                    args.shift();
                    if (args[0]) {
                        const connection = await vc.join();
                        const validUrl = function(str) {
                            const regEx = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
                            if (!regEx.test(str)) {
                                return false;
                            }
                            else {
                                return true;
                            }
                        }
                        const videoFinder = async function(query) {
                            const result = await ytSearch(query);
                            return (result.videos.length > 0) ? result.videos[0] : null;
                        }
                        const isUrl = validUrl(args[0]);       
                        const video = await videoFinder(args.join(' '));
                        const stream = ytdl((isUrl) ? args[0] : video.url, { filter: "audioonly", highWaterMark: 1<<25 });
                        connection.play(stream, { seek: 0, volume: 1 }).on("finish", function() {
                            vc.leave();
                        });
                        message.channel.send(`Playing: **${(isUrl) ? args[0] : video.title}**`);
                    }
                    break;
                case "stop":
                    await vc.leave();
                    break;
                default:
            }
        }  
    }
};
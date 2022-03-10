const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
module.exports = async function(Model, Discord, bot, message, args) {
  const response = new Discord.MessageEmbed();
  const vc = message.member.voice.channel;
  if (!vc) {
    response.setTitle("Plase be in a voice channel to use this command");
    message.channel.send(response);
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
          response.setTitle(`Playing: ${(isUrl) ? args[0] : video.title}`);
          message.channel.send(response);
        }
        break;
      case "stop":
        await vc.leave();
        break;
      default:
    }
  }
};

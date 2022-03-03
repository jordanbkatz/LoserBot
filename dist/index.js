"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
(require('dotenv')).config();
const discord_js_1 = __importDefault(require("discord.js"));
const config_1 = require("./config");
const bot = new discord_js_1.default.Client({ intents: config_1.IntentOptions });
bot.on("ready", () => {
    var _a;
    if (!bot.user || !bot.application)
        return;
    console.log(`Logged in as ${(_a = bot.user) === null || _a === void 0 ? void 0 : _a.tag}!`);
});
bot.on("messageCreate", (msg) => {
    if (!msg.content.startsWith(config_1.Prefix) || msg.author.bot)
        return;
    const [cmd, ...args] = msg.content.trim().substring(config_1.Prefix.length).split(/\s+/);
    msg.channel.send("im a bot");
});
bot.on("error", (e) => {
    console.log(`Discord client error`, e);
});
bot.login(process.env.TOKEN);

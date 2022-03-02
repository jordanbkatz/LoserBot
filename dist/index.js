"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
const client = new discord_js_1.default.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const config_1 = require("./config");
try {
    client.login(config_1.Config.token);
}
catch (e) {
    console.log(`Login failed: ${e}`);
}
client.on("ready", () => {
    var _a;
    console.log(`Logged in as ${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag}!`);
});
client.on("messageCreate", (message) => {
    if (!message.content.startsWith(config_1.Config.prefix) || message.author.bot)
        return;
    const [cmd, ...args] = message.content.trim().substring(config_1.Config.prefix.length).split(/\s+/);
    message.reply("im a bot");
});

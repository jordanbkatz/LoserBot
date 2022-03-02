"use strict";
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const dotenv = require('dotenv');
const prefix = "$loser";
dotenv.config();
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
client.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot)
        return;
    const [cmd, ...args] = message.content.trim().substring(prefix.length).split(/\s+/);
    console.log(message);
});
client.login(process.env.TOKEN);

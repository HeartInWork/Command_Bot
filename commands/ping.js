const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    const m = await message.channel.send("Ping sent.");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms.`);
}

module.exports.help = {
    name: "ping",
    descriptor: "Calculates the ping between sending a message and editing, giving a round-trip latency value."
}

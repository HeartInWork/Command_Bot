const Discord = module.require("discord.js");
const config = module.require("../config.json");
const fs = module.require("fs");

module.exports.run = async (bot, message, args) => {
    fs.readdir("./commands/", (err, files) => {
        if(err) console.error(err);
        let jsfiles = files.filter(f => f.split(".").pop() === "js");
        jsfiles.forEach((f,i) => {
            let props = require(`./${f}`);
            console.log(JSON.stringify(props));
            message.channel.send(`${i+1}: ${config.prefix}${f.split(".")[0]} --> ${props.help.descriptor}`);
        });
    });
}

module.exports.help = {
    name: "help",
    descriptor: "List all the available commands and their descriptions."
}
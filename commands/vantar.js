const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()
        .setAuthor("Vantar")
        .setDescription("Clean or Scripter?")
        .setImage("https://i.imgur.com/Ts6Ap5E.png")
    message.channel.send(embed);

}

module.exports.help = {
    name: "vantar",
    descriptor: "Find out if Vantar is as clean as he says."
}
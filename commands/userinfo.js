const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()
        .addField("Full Discord Username", `${message.author.username}#${message.author.discriminator}`)
        .addField("Discord ID", message.author.id)
        .addField("Discord Account Created at", message.author.createdAt)
    message.channel.send(embed);

}

module.exports.help = {
    name: "userinfo",
    descriptor: "Outputs your own information."
}
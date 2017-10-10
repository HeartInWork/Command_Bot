const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    let toInfo = message.mentions.users.first();
    if(!toInfo) {
        message.channel.send("You did not mention anyone with @");
        return;
    }
    let embed = new Discord.RichEmbed()
    .addField("Full Discord Username", `${toInfo.username}#${toInfo.discriminator}`)
    .addField("Discord ID", toInfo.id)
    .addField("Discord Account Created at", toInfo.createdAt)
    message.channel.send(embed);


}

module.exports.help = {
    name: "info",
    descriptor: "Mention someone with @ to get their information."
}
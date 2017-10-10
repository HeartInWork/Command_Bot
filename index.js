const Discord = require('discord.js');
const config = require("./config.json");
const fs = require("fs");


const prefix = config.prefix;

const bot = new Discord.Client();

bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if(err) console.error(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    //console.log(jsfiles);
    if(jsfiles.length <= 0) {
        console.log("No commands to load!");
        return;
    }

    console.log(`Loading ${jsfiles.length} command(s)!`);

    jsfiles.forEach((f,i) => {
        let props = require(`./commands/${f}`);
        console.log(`${i+1}: ${f} loaded.`);
        bot.commands.set(props.help.name, props);
    });

});

bot.on("ready", async() => {
    console.log(`Bot is ready! ${bot.user.username}`);
    /*bot.guilds.get("307768566684581889").
    channels.get("366095570982404097").send(`Bot is ready! ${bot.user.username}`);
    */

});

bot.on("message", async message => {
    if(message.author.bot) return; //Bots can't initaite action
    if(message.channel.type === "dm") return;  //No DMs
    // === allows no type conversions also doesn't work

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(prefix)) return;

    let theCMD = command.slice(1).toLowerCase();
    console.log(theCMD);
    let cmd = bot.commands.get(theCMD);
    if(cmd) cmd.run(bot,message,args);

});

bot.on("guildMemberAdd", async member => {
    const welChannel = member.guild.channels.find("name","welcome");
    welChannel.send(`Welcome ${member.displayName}.`);
    let role = member.guild.roles.find(r => r.name === "New Member Muted");
    if(!role) {
        try {
            role = await member.guild.createRole({
                name: "New Member Muted",
                color: "#000000",
                permissions: [],
                mentionable: false
            });
            
            member.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(role, {
                    SEND_MESSAGES: false,
                    READ_MESSAGE_HISTORY: false,
                    ATTACH_FILES: false,
                    ADD_REACTIONS: false,
                    SPEAK: false,
                    CONNECT: false
                });
                if(channel == welChannel) {
                    await channel.overwritePermissions(role, {
                        SEND_MESSAGES: true,
                        READ_MESSAGE_HISTORY: false,
                        ADD_REACTION: false
                    });
                }
            }); 
            //console.log(JSON.stringify(role));
        } catch(e) {
            console.log(e.stack);
        }
    }  
    await member.addRole(role);

    welChannel.send("Welcome to Heart in Works Original Discord Server.\n Please type your summoner name (as it appears in game)");
    
    const messageCollector = new Discord.MessageCollector (welChannel, )


});

bot.login(config.token);
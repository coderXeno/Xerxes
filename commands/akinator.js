const Discord = require("discord.js");
const Command = require("../structures/Command");
const akinator = require("discord.js-akinator");

module.exports = new Command({
    name: 'akinator',
    usage: "<prefix>akinator",
    description: "Plays an akinator game",

    async run(message,args,client){
        message.react('✅');
        message.reply("Lets Play Akinator!")
        akinator(message,client);
    }
})
const Discord = require("discord.js");
const Command = require("../structures/Command");

module.exports = new Command({
    name: "coinflip",
    usage: "<prefix>coinflip",
    description: "Flips a coin",

    async run(message,args,client){
        const n = Math.floor(Math.random() * 2);
        let result;
        if(n === 1)
            result = "heads";
        else
            result = "tails";

        const fliPEmbed = new Discord.MessageEmbed()
            .setTitle(` COIN FLIP`)
            .setDescription(`The flipped coin of ${message.member} gave out **${result}**!`)
            .setFooter(message.member.displayName, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setImage('https://pngimg.com/uploads/coin/coin_PNG36907.png')
            .setColor("DARK_GOLD")
            .setTimestamp()

        message.channel.send({
            embeds: [fliPEmbed]
        });
    }
})
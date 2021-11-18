const Discord = require("discord.js");
const Command = require("../structures/Command");
const axios = require("axios");

module.exports = new Command({
    name: "cat",
    usage: "<prefix>cat",
    description: "Random facts about cats",
    //https://api.thecatapi.com/v1/images/search
    //https://catfact.ninja/fact
    async run(message,args,client){
        axios.get('https://api.thecatapi.com/v1/images/search')
            .then(function(response){
                axios.get('https://catfact.ninja/fact')
                    .then(function(res){

                        const catEmbed = new Discord.MessageEmbed()
                            .setTitle(`Sneak Peek into the Cat World`)
                            .setDescription(`${res.data.fact}`)
                            .setImage(`${response.data[0].url}`)
                            .setFooter(message.author.tag, message.author.displayAvatarURL({
                                dynamic: true
                            }))
                            .setColor("GOLD")
                            .setTimestamp()

                        message.channel.send({
                            embeds: [catEmbed]
                        });
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
            })
            .catch((err)=>{
                console.log(err);
            })
    }
})
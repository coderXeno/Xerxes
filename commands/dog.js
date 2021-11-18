const axios = require("axios");
const Discord = require("discord.js");
const Command = require("../structures/Command");

module.exports = new Command({
    name: "dog",
    usage: "<prefix>dog",
    description: "Dogs",

    //https://api.thedogapi.com/v1/images/search
    //http://dog-api.kinduff.com/api/facts
    async run(message, args, client) {
        axios.get("https://api.thedogapi.com/v1/images/search")
            .then(function (response) {
                axios.get("http://dog-api.kinduff.com/api/facts")
                    .then(function (res) {

                        const dogEmbed = new Discord.MessageEmbed()
                            .setTitle(`Sneak Peek into the Dog World`)
                            .setDescription(`${res.data.facts[0]}`)
                            .setImage(`${response.data[0].url}`)
                            .setFooter(message.author.tag, message.author.displayAvatarURL({
                                dynamic: true
                            }))
                            .setColor("GOLD")
                            .setTimestamp()

                        message.channel.send({
                            embeds: [dogEmbed]
                        });
                    })
            })
            .catch((err) => {
                console.log(err);
            })
    }
})
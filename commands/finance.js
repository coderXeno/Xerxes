const Discord = require("discord.js");
var axios = require("axios").default;
const Command = require("../structures/Command");

module.exports = new Command({
    name: "finance",
    usage: "<prefix>finance",

    async run(message, args, client) {

        axios.get("https://api.coindesk.com/v1/bpi/currentprice.json")
            .then(function(response){
                
                const priceDetailsEmbed = new Discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({
                        dynamic: true
                    }))
                    .setTitle("THE BITCOIN PRICE INDEX")
                    .setDescription(`View the Bitcoin Price Index in real-time.\n${response.data.disclaimer}`)
                    .addFields(
                        {
                            name: "chartname", value: `${response.data.chartName}`
                        },
                        {
                            name: "time", value: `${response.data.time.updated}\n${response.data.time.updatedISO}\n${response.data.time.updateduk}`,inline: false
                        },
                        {
                            name: `BPI - ${response.data.bpi.USD.code}`, value: `Rate: ${response.data.bpi.USD.rate}\n Description - ${response.data.bpi.USD.description}\nRate Float - ${response.data.bpi.USD.rate_float}`, inline: true
                        },
                        {
                            name: `GBP - ${response.data.bpi.GBP.code}`, value: `Rate: ${response.data.bpi.GBP.rate}\n Description - ${response.data.bpi.GBP.description}\nRate Float - ${response.data.bpi.GBP.rate_float}`, inline: true
                        },
                        {
                            name: `EUR - ${response.data.bpi.EUR.code}`, value: `Rate: ${response.data.bpi.EUR.rate}\n Description - ${response.data.bpi.EUR.description}\nRate Float - ${response.data.bpi.EUR.rate_float}`, inline: true
                        }
                    )
                    .setImage("https://st2.depositphotos.com/1364029/8671/i/600/depositphotos_86718588-stock-photo-golden-bitcoins.jpg")
                    .setColor("DARK_BLUE")
                    .setTimestamp()

                    message.reply({
                        embeds: [priceDetailsEmbed]
                    })
            })
            .catch((err)=>{
                console.log(err);
            })
    }
})
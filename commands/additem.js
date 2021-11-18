const Discord = require("discord.js");
const CurrencySystem = require("currency-system");
const Command = require("../structures/Command");
const cs = new CurrencySystem;

module.exports = new Command({
    name: "additem",
    usage: "<prefix>additem",
    description: "Add item to shop",

    async run(message, args, client) {
        message.reply({
            content: `What is the item that you want to be added to shop?`
        });

        const filter = (msg) => msg.author.id === message.author.id;

        const collector = message.channel.createMessageCollector({
            filter,
            time: 20000,
            max: 1
        });

        collector.on("collect", (itemname) => {
            itemname.react('✅');

            message.channel.send(`What should be the price of ${itemname.content}`);
            const filter = (msg) => msg.author.id === message.author.id;

            const collect = message.channel.createMessageCollector({
                filter,
                time: 20000,
                max: 1
            });

            collect.on("collect", (itemprice) => {
                itemprice.react('✅');

                message.channel.send(`Provide a description for ${itemname.content}`);
                const filter = (msg) => msg.author.id === message.author.id;

                const c = message.channel.createMessageCollector({
                    filter,
                    time: 20000,
                    max: 1
                });

                c.on("collect", async (itemdescription) => {
                    itemdescription.react('✅');

                    let result = await cs.addItem({
                        guild: message.guild,
                        inventory: {
                            name: itemname.content,
                            price: parseInt(itemprice.content),
                            description: itemdescription.content
                        }
                    });

                    if (result.error) {
                        if (result.type == 'No-Inventory-Name') 
                            return message.channel.send('There was a error, Please enter item name to removadd.!')
                        if (result.type == 'Invalid-Inventory-Price') 
                            return message.channel.send('There was a error, invalid price!')
                        if (result.type == 'No-Inventory-Price') 
                            return message.channel.send('There was a error, You didnt specify price!')
                        if (result.type == 'No-Inventory') 
                            return message.channel.send('There was a error, No data recieved!')
                    } else message.channel.send('Done! Successfully added `' + Name.content + '` to the shop!')
                })

                c.on("end", collected => console.log(`Collected ${collected.size} item description(s)`))
                
            })

            collect.on("end", collected => console.log(`Collected ${collected.size} item price(s)`))
        })

        collector.on("end", collected => console.log(`Collected ${collected.size} item name(s)`))

    }
})
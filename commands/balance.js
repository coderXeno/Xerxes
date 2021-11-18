const CurrencySystem = require("currency-system");
const Command = require("../structures/Command");
const cs = new CurrencySystem;

module.exports = new Command({
    name: "bal",
    usage: "<prefix>inv",
    description: "Know the amount of money in your bank",

    async run(message,args,client){
        let user = message.author;
        if(message.mentions.users.first()){
            user = message.mentions.users.first();
        } else if(args[0]){
            user = await message.guild.members.fetch(args[0]);
            if(user)
                user = user.user
        }

        let result = await cs.balance({
            user: user,
            guild: message.guild
        });

        message.channel.send(`${user.tag}, has $${(result.wallet).toLocaleString()} in there wallet and $${(result.bank).toLocaleString()} in there bank. There Max bank has been set to $${(result.rawData.bankSpace.toLocaleString())}`)
    }
})
const Discord = require("discord.js");
const CurrencySystem = require("currency-system");
const Command = require("../structures/Command");
const {Permissions} = require("discord.js");
const cs = new CurrencySystem;

module.exports = new Command({
    name: "addmoney",
    description: "Add the amount of money to your bank or wallet",
    usage: "<prefix>addmoney <user> <money> <bank/wallet>",
    cooldown: 0.5,

    async run(message,args,client){
        let user;

        if(message.mentions.users.first()){
            user = message.mentions.users.first();
        } else if(args[1]){
            user = message.guild.members.cache.get(args[0]);
            if(user)
                user = user.user
        } else if(!args[1]){
            return message.reply({
                content: "Please specify the user you want to send money to: "
            });
        }

        if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
            return message.reply({
                content: "You do not have the required permissions to invoke this command. This command can only be run by **ADMINISTRATORS**"
            });

        let wheretoPutMoney = args[3] || "bank";
        let amount = parseInt(args[2]);

        if(!amount)
            return message.channel.send({
                content: `Please specify the amount of money to add`
            });

        let money = parseInt(amount);
        let result = await cs.addMoney({
            user: user,
            guild: message.guild,
            amount: money,
            wheretoPutMoney: wheretoPutMoney
        });

        if(result.error)
            return message.channel.send("You cannot add a negative amount of money")

        else
            message.channel.send(`Successfully added $${money} to ${user.username}, ( in ${wheretoPutMoney} )`);
    }
})
const Discord = require('discord.js');
const config = require('./data/config.json');
const intents = new Discord.Intents(32767);
const fs = require("fs");
const Client = require("./structures/Client");
const Command = require('./structures/Command');
const mongoose = require("mongoose");
const schema = require("./schema/boostNotif");
const db = require("quick.db");
const { MessageAttachment } = require("discord.js");
const { Captcha } = require("captcha-canvas");
const ms = require("ms");
const timeSpan = ms('2 days');
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
const {WebhookClient, Message} = require("discord.js");

mongoose.connect('mongodb+srv://ethXeno:xeno2021@xeno.6lxkx.mongodb.net/test', {
    useUnifiedTopology: true
}).then(console.log('Connected to Mongoose'))

// Economy System Under development, so all following lines may have been written but are not significant
cs.setMongoURL("mongodb+srv://ethXeno:xeno2021@xeno.6lxkx.mongodb.net/test");
cs.setDefaultWalletAmount('15000');
cs.setDefaultBankAmount('10000');
cs.setMaxWalletAmount(1000000);
cs.setMaxBankAmount(500000);
cs.searchForNewUpdate(true);
cs.setDefaultBankLimitForUser(50000);

const client = new Client();
client.aliases = new Discord.Collection();

fs.readdirSync("../src/commands")
    .filter(file => file.endsWith(".js"))
    .forEach(file => {
        /**
         * @type {Command}
         */
        const command = require(`./commands/${file}`)
        console.log(`Command ${command.name} loaded`)
        client.commands.set(command.name, command);
    })

client.on("ready", async () => {
    console.log("Xeno is back in a new form!!");
    client.user.setActivity("x.help | x.info", {
        type: "LISTENING"
    })
});

client.on("messageCreate", message => {
    // console.log(message.content);
    // if(message.content=="sup")  message.reply("Yo")
    if (message.author.bot) return;

    if (!message.content.toLowerCase().startsWith(config.prefix))
        return;

    const args = message.content.toLowerCase().substring(config.prefix.length).split(/ +/);
    const command = client.commands.find(cmd => cmd.name == args[0]);
    if (!command)
        return message.reply(`${args[0]} is not a valid command! Run x.help for the commands`);
    command.run(message, args, client);
});

const welcomeSchema = require('./schema/welcomeSchema');
const { builtinModules } = require('module');
client.on("guildMemberAdd", async (member, guild) => {
    welcomeSchema.findOne({
        guildID: member.guild.id
    }, async (err, data) => {
        if (!data)
            return;

        const createdAt = new Date(member.user.createdAt).getTime();
        const difference = Date.now() - createdAt;

        if (difference < timeSpan) {
            member.send("You are an alt account");
            member.send("Alt account");
        }

        if (difference > timeSpan) {

            const user = member.user;
            const channel = member.guild.channels.cache.get(data.channelID);
            const wmsg = data.welcomeMsg;

            channel.send(`Welcome aboard ${user}`);
        }
    })
});

client.on("guildMemberRemove", async (member, guild) => {
    welcomeSchema.findOne({
        guildID: member.guild.id
    }, async (err, data) => {
        if (!data)
            rety = urn;

        const user = member.user.tag;
        const channel = member.guild.channels.cache.get(data.channelID);
        channel.send(`${user} just left the server :(`)
    })
});

client.on("guildCreate", (guild) => {
    const channel = guild.channels.cache.find(
        (channel) => {
            channel.type === "text" && channel.permissionsFor(guild.me).has("SEND_MESSAGES")
        }
    );

    if (!channel)
        return;

    const guildEmbed = new Discord.MessageEmbed()
        .setAuthor(guild.name, guild.iconURL({
            dynamic: true
        }))
        .setTitle("Done!")
        .setDescription(`Sup people! This is Xeno. I have been built by Eth#2435`)
        .setColor("DARK_VIVID_PINK")
        .setFooter("Message Eth#2435 for any help needed for the bot")
        .setTimestamp();

    message.channel.send({
        embeds: [guildEmbed]
    });
});

client.login(config.token);
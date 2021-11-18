const Discord=require("discord.js");
const Command=require("../structures/Command");
const {Permissions}=require("discord.js");

module.exports=new Command({
    name: "ban",
    description:"bans a member",
    usage:"<mention||userID> <reason for ban>",
    async run(message,args,client){
        const target=message.mentions.members.first();
        if(!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS))
            return message.channel.send({
                content: "Sorry! You need the proper authority to use this command"
            });

        if(!target)
            return message.channel.send({
                content: `Please mention a user to ban`
            });

        if(!target.bannable)
            return message.channel.send({
                content: `That user cant be banned`
            });

        if(target.id===message.author.id)
            return message.channel.send({
                content: "You cant ban yourself"
            });

        if(target==message.guild.owner)
            return message.channel.send({
                content: "Bruh! That is the server owner!"
            });

        const reasonForBan=args.slice(2).join(" ")||"A reason wasnt provided for the ban";
        const targetMember=message.guild.members.cache.get(target.id);

        const preWarnEmbed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag,message.author.displayAvatarURL({
                dynamic: true
            }))
            .setDescription("Do you want to ban that user?")
            .setColor("DARK_BUT_NOT_BLACK")
            .setTitle("Ban Order")
            .setTimestamp()
            
        if(target.bannable){
            let msg = await message.channel.send({ embeds: [preWarnEmbed]})

            const acceptFilter = (reaction , user) => reaction.emoji.name === '👍' && user.id === message.author.id;
            const rejectFilter = (reaction , user) => reaction.emoji.name === '👎' && user.id === message.author.id;

            const accept = msg.createReactionCollector({acceptFilter,time: 90000, dispose: true, max: 1});
            const reject = msg.createReactionCollector({rejectFilter,time: 90000, dispose: true, max: 1});

            accept.on("collect",r => {
                r.users.remove(message.author.id);
                targetMember.ban({
                    days:0,
                    reason: `Ban Ordered by ${message.author.tag}, the reason being: ${reasonForBan}`
                });
                
                const embed=new Discord.MessageEmbed()
                    .setDescription(`Banned ${target.id}, \nfor the reason being ${reasonForBan}`)
                    .setTimestamp()
                    .setColor(`RED`)
                message.channel.send({
                    embeds: [embed]
                });
                
                target.send({
                    content: `You have been banned from ${message.guild.name} for ${reasonForBan} by ${message.author.tag}`
                })                
            });

            reject.on("collect",r => {
                r.users.remove(message.author.id);
                return msg.delete();
            })
        }
    }
})

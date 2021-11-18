const Discord = require("discord.js");
const { MessageActionRow, MessageButton } = require("discord.js");
const Command = require("../structures/Command");

module.exports = new Command({
    name: "fight",
    usage: "<prefix>fight <opponent>",
    description: "fights another user",

    async run(message, client, args) {

        let opponent = message.mentions.users.first();

        if (!opponent)
            return message.channel.send("Please enter a valid opponent to fight")

        if (opponent.bot)
            return message.channel.send("Sorry, cannot fight a bot");

        if (opponent.id === message.author.id)
            return message.channel.send("Bro why you tryna fight yourself? L O L");

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('Yes')
                    .setLabel("Yes")
                    .setStyle("PRIMARY"),

                new MessageButton()
                    .setCustomId('No')
                    .setLabel('No')
                    .setStyle("PRIMARY")
            )

        message.channel.send({
            content: `${opponent}, Do you accept ${message.author}'s challenge?`,
            components: [row]
        });

        const filter = (interaction) => {
            if (interaction.user.id === opponent.id)
                return true;
            return interaction.reply({
                content: `This button is for @${opponent} . Imagine trying to click someone else's challenge accept button, ${interaction.user}`
            })
        };

        const collector = message.channel.createMessageComponentCollector({
            filter,
            max: 1,
            time: 20000
        });

        collector.on("collect", async (ButtonInteractions) => {
            row.components[0].setDisabled(true);
            row.components[1].setDisabled(true);

            ButtonInteractions.message.edit({
                components: [row]
            });

            const id = ButtonInteractions.customID;
            let turn = 1;
            let challenger_hp = 250;
            let opponent_hp = 250;
            let common_move_prob = 0.70588235294 * 100;
            let rare_move_prob = 17.647058823;
            let leg_move_prob = 0.05882352941 * 100;
            const moveset = ["Fist Barrage (Common)", "300dB Broken Singing (Common)", "Frost Chill (Common)", "Literally Not Karen (Common)", "Powercut Frightening (Rare)", "Fist Barrage (Common)", "300dB Broken Singing (Common)", "Frost Chill (Common)", "Literally Not Karen (Common)", "Powercut Frightening (Rare)", "Galactic Supernova (Legendary)", "Fist Barrage (Common)", "300dB Broken Singing (Common)", "Frost Chill (Common)", "Literally Not Karen (Common)", "Powercut Frightening (Rare)", "Starry Sky (Legendary)"];
            const movedamage = [35, 35, 35, 35, 55, 35, 35, 35, 35, 55, 150, 35, 35, 35, 35, 55, 150];
            const movesEmbed = new Discord.MessageEmbed()
                .setTitle("RULES")
                .setDescription(`Each player,in this case,${opponent} and ${message.author} gets 250 health points in all. The first player whose health point reaches zero is the loser.\nThese are the moves that you can get while fighting. \nNote that you have:- \nA **${common_move_prob}% probability** of getting a **Common Type move**, \nA **${rare_move_prob}% probability** of getting a **Rare Type Move**, \nand a **${leg_move_prob}% probability** of getting a **Legendary Type Move**`)
                .addFields({
                    name: "Fist Barrage (Common)",
                    value: "Damage: 35",
                    inline: true
                }, {
                    name: "300dB Broken Singing (Common)",
                    value: "Damage: 35",
                    inline: true
                }, {
                    name: "Frost Chill (Common)",
                    value: "Damage: 35",
                    inline: true
                }, {
                    name: "Literally Not Karen (Common)",
                    value: "Damage: 35",
                    inline: true
                }, {
                    name: "Powercut Frightening (Rare)",
                    value: "Damage: 55",
                    inline: true
                }, {
                    name: "Galactic Supernova (Legendary)",
                    value: "Damage: 150",
                    inline: true
                })
                .addFields({
                    name: "You will have the following options available during the fight",
                    value: "1. **Fight** \nChoosing this gives you one of the moves according to the probablities mentioned above to deal damage to your opponent with.\n2. **Guard** \nChoosing this option cancels out 15 damage out of any move so as to balance the fight. \n**Have fun!!**"
                })
                .setColor("RED")
                .setImage("https://cdn.pixabay.com/photo/2017/05/29/19/13/fire-and-water-2354583__480.jpg")

            message.channel.send({
                embeds: [movesEmbed]
            });

            if (id == "Yes") {
                console.log("Entered loop");
                while (challenger_hp !== 0 || opponent_hp !== 0) {
                    if (turn % 2 !== 0) {
                        await message.channel.send(`$Defendant ${opponent}, choose what you want to go with.\nYou have two options: **Fight** or **Guard**\nIn the next 30 seconds either type f (for fight) or g(for guard).`);

                        const filter = x => {
                            return (x.author.id === opponent.id)
                        };

                        const moveByOpponent = await message.channel.awaitMessages({
                            filter,
                            max: 1,
                            time: 30000
                        });

                        moveByOpponent.react('✅');
                        if (moveByOpponent.first().content.toLowerCase() === "f" || moveByOpponent.first().content.toLowerCase() === "fight") {
                            const random = Math.floor(Math.random() * moveset.length);
                            challenger_hp = challenger_hp - movedamage[random];
                            turn = turn + 1;

                            const opponentEmbed = new Discord.MessageEmbed()
                                .setTitle("Live Fight Stats")
                                .setDescription(`Defendant ${opponent} used ${moveset[random]} on ${message.author} dealing ${movedamage[random]} damage!`)
                                .addFields({
                                    name: `Remaining Health Points of Challenger ${message.author}`,
                                    value: `${challenger_hp}`,
                                    inline: false
                                }, {
                                    name: `Remaining Health Points of Defendant ${opponent}`,
                                    value: `${opponent_hp}`,
                                    inline: false
                                })
                                .setColor("DARK_RED")

                            console.log(challenger_hp, opponent_hp);

                            await message.channel.send({
                                embeds: [opponentEmbed]
                            });
                        } else if (moveByOpponent.first().content.toLowerCase() === "g" || moveByOpponent.first().content.toLowerCase() === "guard") {
                            opponent_hp = opponent_hp + 15;
                            turn = turn + 1;

                            const opponentEmbed = new Discord.MessageEmbed()
                                .setTitle("Live Fight Stats")
                                .setDescription(`Defendant ${opponent} protected against ${message.author}'s next attack thus cancelling out 15 damage!`)
                                .setColor("DARK_RED");

                            console.log(challenger_hp, opponent_hp);
                            await message.channel.send({
                                content: `You guarded and blocked away 15 damage from the opponent's next move!`,
                                embeds: [opponentEmbed]
                            });
                        }
                    } else if (turn % 2 === 0) {
                        message.channel.send(`$Challenger ${message.author}, choose what you want to go with.\nYou have two options: **Fight** or **Guard**\nIn the next 30 seconds either type f (for fight) or g(for guard).`);
                        const filter = x => {
                            return (x.author.id === message.author.id);
                        };

                        const moveByChallenger = await message.channel.awaitMessages({
                            filter,
                            max: 1,
                            time: 30000
                        });
                        moveByChallenger.react('✅');

                        if (moveByChallenger.first().content.toLowerCase() === "f" || moveByChallenger.first().content.toLowerCase() === "fight") {
                            const random = Math.floor(Math.random() * moveset.length);
                            opponent_hp = opponent_hp - movedamage[random];
                            turn = turn + 1;

                            const challengerEmbed = new Discord.MessageEmbed()
                                .setTitle("Live Fight Stats")
                                .setDescription(`Challenger ${message.author} used ${moveset[random]} on ${opponent} dealing ${movedamage[random]} damage!`)
                                .addFields({
                                    name: `Remaining Health Points of Challenger ${message.author}: `,
                                    value: `${challenger_hp}`,
                                    inline: false
                                }, {
                                    name: `Remaining Health Points of Defendant ${opponent}: `,
                                    value: `${opponent_hp}`,
                                    inline: false
                                })
                                .setColor("DARK_RED");

                            console.log(challenger_hp, opponent_hp);

                            await message.channel.send({
                                embeds: [challengerEmbed]
                            });
                        } else if (moveByChallenger.first().content.toLowerCase() === "g" || moveByChallenger.first().content.toLowerCase() === "guard") {
                            challenger_hp = challenger_hp + 15;
                            turn = turn + 1;

                            const challengerEmbed = new Discord.MessageEmbed()
                                .setTitle("Live Fight Stats")
                                .setDescription(`Challenger ${message.author} protected against ${opponent}'s next attack thus cancelling out 15 damage!`)
                                .setColor("DARK_RED")
                            message.channel.send({
                                content: `You guarded and blocked away 15 damage from the opponent's next move!`,
                                embeds: [opponentEmbed]
                            });

                            console.log(challenger_hp, opponent_hp);

                            await message.channel.send({
                                content: `You guarded and blocked away 15 damage from the opponent's next move!`
                            });

                        }
                    }
                }

                if (challenger_hp === 0) {
                    return ButtonInteractions.first().reply(`Ayy! Defendant ${opponent} wins the match against Challenger ${message.author}`)
                } else if (opponent_hp === 0) {
                    return ButtonInteractions.first().reply(`Ayy! Challenger ${message.author} wins the match against Challenger ${opponent}`)
                }
            }

            if (id == "No") {
                return ButtonInteractions.first().reply(`Sorry, ${message.author}. Looks like ${opponent.username} declined your challenge. Maybe next time...`)
            }
        });
    }
})


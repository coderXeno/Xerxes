const Discord = require("discord.js");
const Command = require("../structures/Command");
const axios = require("axios");

module.exports = new Command({
    name: "bored",
    usage: "<prefix>bored",
    description: "Returns an activity to do when bored with the number of participants required.",

    async run(message,args,client){
        axios.get("https://www.boredapi.com/api/activity")
            .then(function(response){
                let participants = response.data.participants;

                if(participants === 1){
                    return message.reply({
                        content: `You bored? I'll tell you what to do.\n${response.data.activity}.\nAlso guess what?\nYou can do it single handedly.`
                    });
                } else if(participants > 1){
                    return message.reply({
                        content: `You bored? I'll tell you what to do.\n${response.data.activity}.\n Number of participants required to do this: ${response.data.participants}`
                    });
                }
            })
            .catch((err)=>{
                console.log(err);
            })
    }
})
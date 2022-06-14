const Discord = require('discord.js')
module.exports = {
    name:'ban',
    description: 'This command bans a user, administrator only!',
    options:[
        {
            name:"user",
            type:"USER",
            description:"User to ban",
            required: true,
        },
        {
            name:"reason",
            type:"STRING",
            description:"Reason to ban the user",
            required:false
        },
        {
            name:"time",
            type:"INTEGER",
            description:"Time to ban (defaults to minutes if unit is not specified)",
            required:false
        },
        {
            name:"unit of time",
            description:"Unit of time",
            type:"STRING",
            required:false,
            options:[
                {
                    name:"seconds",
                    value:"second"
                },
                {
                    value:'minute',
                    name:"minutes"
                },
                {
                    name:"hours",
                    value:"hour"
                },
                {
                    name:"days",
                    value:"day"
                },
                {
                    name:"weeks",
                    value:"week"
                },
                {
                    name:"months",
                    value:'month'
                },
            ]
        }
    ],
    execute(interaction) {
        const target = interaction.options.get('user').value
        if (!interaction.options.get("reason")) {
            interaction.guild.members.ban(target, {reason:`No Reason Provided, Member was banned by ${interaction.user.username}#${interaction.user.discriminator}`}).then(interaction.reply({ content:"Member Banned!", ephemeral:true })).catch(err => {message.channel.send(`There was a error: ${err}`)})
        }else{
            interaction.guild.members.ban(target, {reason:`${interaction.options.get('reason')}, Member was banned by ${interaction.user.username}#${interaction.user.discriminator}`}).then(interaction.reply({ content:"Member Banned!", ephemeral:true })).catch(err => {message.channel.send(`There was a error: ${err}`)})
        }
    }
}
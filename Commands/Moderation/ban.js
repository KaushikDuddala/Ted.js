const Discord = require('discord.js');


module.exports = {
    name: 'ban',
    description: 'This command bans a user, administrator only!',
    aliases: ['banish'],
    args: true,
    cooldown: 10,
    permissions: ['BAN_MEMBERS', 'ADMINISTRATOR'],
    usage: '<user> [reason]',
    execute(message, args) {
        const { guild, mentions, member } = message
        const target = mentions.users.first()
        if(args[0] === mentions.users.first()){
            const targetMember = message.guild.members.cache.get(target.id)
            message.guild.members.ban(targetMember, `Member banned by ${message.author.username}#${message.author.discriminator}`)
            message.channel.send(`<@${member.id}> user ${target} has been banned`)
        }
        else {
          const Embedp = new Discord.MessageEmbed()
          .setTitle("Permission error")
          .setDescription("Either, I don't have permission to ban members or you don't have permission to ban members, or you simply used the wrong format, the format is `~ban <user>`, Make sure to ping them in <user>")
          message.channel.send(Embedp)
        }
    }
}
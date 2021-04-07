const Discord = require('discord.js');


module.exports = {
    name: 'ban',
    description: 'This command bans a user, administrator only!',
    aliases: ['banish'],
    args: true,
    cooldown: 10,
    permissions: ['BAN_MEMBERS', 'ADMINISTRATOR'],
    usage: '<user>',
    execute(message, args) {
        const { guild, mentions, member } = message
        const target = mentions.users.first()
        if(args[0] === mentions.users.first()){
            const targetMember = message.guild.members.cache.get(target.id)
            targetMember.ban()
            message.channel.send(`<@${member.id}> user ${target} has been banned`)
        }
        else {
          message.channel.send("You either dont have permission or you arent using the right format, the format is `~ban <User>` Make sure to ping them in <user> instead of saying their name")
        }
    }
}
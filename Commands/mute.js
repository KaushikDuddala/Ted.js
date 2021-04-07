const Discord = require('discord.js')
module.exports = {
  name: "mute",
  description: "Mute anyone who break rules",
  usage: "mute <@mention> <time> <reason>",
  permissions: ['MANAGE_ROLES', 'ADMINISTRATOR', 'MUTE_MEMBERS', 'MANAGE_MESSAGES'],
 execute(message, args) {
    if (!message.member.hasPermission === ['MANAGE_ROLES']) {
      return message.channel.send(
        "Sorry but you do not have permission to mute anyone"
      );
    }
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("I do not have permission to manage roles.");
    }
    const user = message.mentions.members.first();
    if(!user) {
      return message.channel.send("Please mention the member to who you want to mute")
    }
    if(user.id === message.author.id) {
      return message.channel.send("I won't mute you -_-");
    }
    let reason = args.slice(2).join(" ")
    if(!reason) {
      return message.channel.send("Please Give the reason to mute the member")
    }
      let muterole = message.guild.roles.cache.find(x => x.name === "Muted lol")
      if(!muterole) {
      return message.channel.send("This server do not have role with name `Muted` Please contact Launch.vbs#5899 on discord")
    }
   if(user.roles.cache.has(muterole)) {
      return message.channel.send("Given User is already muted")
    }
    user.roles.add(muterole)
  message.channel.send(`You muted **${message.mentions.users.first().username}** For \`${reason}\``)
    user.send(`You are muted in **${message.guild.name}** For \`${reason}\``)
    setTimeout(function(){ user.roles.remove(muterole) }, args[1]);
    setTimeout(function(){message.channel.send("<@" +user+ "> was unmuted")}, args[1]);
    
  }
};
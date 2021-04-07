const Discord = require('discord.js')
module.exports = {
	name: 'help',
	description: 'List of commands',
	execute(message, args) {
    const helpMessage = new Discord.MessageEmbed()
	.setColor('RANDOM')
	.setTitle('Command List')
	.setDescription('These are the commands developed so far \n 1. ~trivia Usage: `~trivia` Description: Play trivia with this command! \n 2. ~ping Usage: `~ping` Description: Pings the bot and the bot replies with "Pong." \n 3. ~clearchat Usage: `~clearchat [Number of messages]` Example: `~clearchat 10` Description: Deletes a certain amount of messages \n 4. ~Ban Usage: `~ban <User>` (Ping them in <user>) example `~ban @01010100 01100101 01100100 / TED` Description Bans a pinged User \n 5. ~mute, usage: `~mute (User pinged) (time in milliseconds optional)` Example `~mute @Launch.vbs 1000` Description: `Mutes a member`')

message.channel.send(helpMessage);
	},
};
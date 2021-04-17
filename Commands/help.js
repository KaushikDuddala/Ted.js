const Discord = require('discord.js')
module.exports = {
	name: 'help',
	description: 'List of commands',
	execute(message, args) {
    const helpMessage = new Discord.MessageEmbed()
	.setColor('RANDOM')
	.setTitle('Command List')
	.setDescription('These are the commands developed so far \n 1. ~trivia Usage: `~trivia` Description: Play trivia with this command! \n 2. ~ping Usage: `~ping` Description: Pings the bot and the bot replies with "Pong." \n 3. ~clearchat Usage: `~clearchat [Number of messages]` Example: `~clearchat 10` Description: Deletes a certain amount of messages \n 4. ~Ban Usage: `~ban <User>` (Ping them in <user>) example `~ban @TED` Description Bans a pinged User \n 5. ~kahootFlood, usage: ~kahootFlood <Number Of Bots> <Game Pin>, Example: ~kahootFlood 100 123456, Description: Floods a kahoot game with bots \n 6. ~Noobify, Usage: ~Noobify, Description: Decides if you are a noob.... \n 7. ~Play, usage: ~play <song>, example: ~play Bad!, Description: Plays a song. \n 8. ~stop, description: Stops music and exits the voice channel, \n 9. ~pause, description: Pauses music, use ~unpause to continue, \n 10. ~unpause, description: Unpauses previously paused music \n 11. ~queue, description: Shows the current queue \n 12. ~np description: Shows the currently Playing song.')

message.channel.send(helpMessage);
	},
};
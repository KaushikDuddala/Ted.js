module.exports = {
	name: 'ping',
	description: 'Pings the bot, replys with Pong!',
  	usage: "~ping",
  	cooldown: 10,
	execute(message, args) {
		message.channel.send('Pong!');
    	console.log(`Pong to ${message.author.tag}`)
	},
};
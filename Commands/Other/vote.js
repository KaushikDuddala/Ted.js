module.exports = {
	name: 'vote',
	description: 'bot vote link!',
  usage:"~vote",
  cooldown: 10,
	execute(message, args) {
		message.channel.send('https://top.gg/bot/821785135875358791/vote');
	},
};
module.exports = {
	name: 'invite',
	description: 'bot invite!',
  cooldown: 10,
	execute(message, args) {
		message.channel.send('https://discord.com/api/oauth2/authorize?client_id=821785135875358791&permissions=8&scope=bot');
    console.log("Pong.")
	},
};
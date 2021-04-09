
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const StatusUpdater = require('@tmware/status-rotate')
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./Commands/${file}`);
	client.commands.set(command.name, command);
}
client.once('ready', () => {
	console.log('Ready!');
  const status = [
    "Thanks Direjack",
    "Prefix is `~`",
    "I'm POG"
  ]
  let index = 0
  setInterval(() => {
    if (index === status.length) index = 0
    const status2 = status[index]
    client.user.setActivity(status2, { type:"PLAYING"}).catch(console.error)
    index++
  }, 2500)
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(token);
var http = require('http');


http.createServer(function (req, res) {
  res.write("I'm alive");
  res.end();
}).listen(8080);
const YouTube = require("discord-youtube-api");
const youtube = new YouTube
("AIzaSyA25eGUqxnjbAEEtPjx-plIA7m6raoBTPQ");
const channel = 814884952599953459;
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const StatusUpdater = require('@tmware/status-rotate')
const client = new Discord.Client({ disableEveryone: false });
client.commands = new Discord.Collection();
const fetch = require('node-fetch')
const commandFiles = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./Commands/${file}`);
	client.commands.set(command.name, command);
}
client.once('ready', () => {
	console.log('Ready!');
  const status = [
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
// Initialize the invite cache
const invites = {};

// A pretty useful method to create a delay without blocking the whole script.
const wait = require('util').promisify(setTimeout);


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
const ytdl = require('ytdl-core')
const { Util } = require('discord.js')
const queue = new Map()

client.on('message', async message =>{
  const prefix = "~"
  if(message.author.bot) return

  const args = message.content.substring(prefix.length).split(" ")
  const serverQueue = queue.get(message.guild.id)

  if(message.content.startsWith(`${prefix}play`)){
    const voiceChannel = message.member.voice.channel
    if(!voiceChannel){
      message.channel.send(":x: you arent in a voice channel :|")
    }
    const permissions = voiceChannel.permissionsFor(message.client.user)
    if(!permissions.has('CONNECT')) return message.channel.send("Bruh i dont have permission to connect :/")
    if(!permissions.has("SPEAK")) return message.channel.send("I can join but i dont have permissions to speak in the vc bruh")

    const songInfo = await youtube.searchVideos(args[1]);
    const song = {
      title: Util.escapeMarkdown(songInfo.title),
      url: songInfo.url
    }

   if(!serverQueue){
     const queueConstruct = {
       textChannel: message.channel,
       voiceChannel: voiceChannel,
       connection: null,
       songs: [],
       volume: 5,
       playing: true
     }
     queue.set(message.guild.id, queueConstruct)

     queueConstruct.songs.push(song)

      try{
      var connection = await voiceChannel.join()
      queueConstruct.connection = connection
      play(message.guild, queueConstruct.songs[0], message.member.voice.channel)
    } catch(error) {
      console.log("There was a error, " + error)
      queue.delete(message.guild.id)
      return message.channel.send(`There was a error connecting, **${error}**`)
    }

   }else{
     serverQueue.songs.push(song)
     return message.channel.send(`**${song.title}** added to queue!`)
   }

  return undefined

  }else if (message.content.startsWith(`${prefix}stop`)){
    if(!message.member.voice.channel) return message.channel.send("You aren't in a voice channel... kinda sus like are you tryna stop their fun :eyes:")
    if(!serverQueue) return message.channel.send("There is nothing playing")
    serverQueue.songs = []
    serverQueue.connection.dispatcher.end()
    message.channel.send("I have stopped music for you")
    return undefined
  }else if (message.content.startsWith(`${prefix}skip`)){
    if(!message.member.voice.channel) return message.channel.send("you aren't in the voice channel, you have to be in it to skip the song...")
    if(!serverQueue) return message.channel.send("There is nothing playing")
    serverQueue.connection.dispatcher.end()
    message.channel.send("I have skipped the music")
    return undefined
  }else if (message.content.startsWith(`${prefix}volume`) || message.content.startsWith(`${prefix}vol`)){
    if(!message.member.voice.channel) return message.channel.send("you aren't in the voice channel so dont mess with it ig")
    if(!serverQueue) return message.channel.send("Nothing is playing")
    if (!args[1]) return message.channel.send(`The current volume is **${serverQueue.volume}**`)
    if(isNaN(args[1])) return message.channel.send("that isnt a valid amount bruh.")
    serverQueue.volume = args[1]
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 100)
    message.channel.send(`I have changed the volume to ${args[1]}`)
  }else if (message.content.startsWith(`${prefix}np`)) {
      if(!serverQueue) return message.channel.send("there is nothing playing")
      message.channel.send(`Currently Playing ${serverQueue.songs[0].title}`)
  }else if (message.content.startsWith(`${prefix}pause`)){
    if (!message.member.voice.channel) return message.channel.send("ya gotta be in the vc to pause it...")
    if (!serverQueue) return message.channel.send("There is nothing playing")
    if (!serverQueue.playing) return message.channel.send("It's already paused... do unpause to unpause it.")
    serverQueue.playing = false
    serverQueue.connection.dispatcher.pause()
    message.channel.send("I have now paused the music.")
    return undefined
  }else if (message.content.startsWith(`${prefix}unpause`)) {
    if(!message.member.voice.channel) return message.channel.send("You arent in the voice channel.")
    if(!serverQueue) return message.channel.send("There isn't anything playing though, use play or stop")
    if (serverQueue.playing == true) return message.channel.send("It's not even paused tho.")
    
  }else if (message.content.startsWith(`${prefix}queue`)){
    if (!serverQueue) return message.channel.send("there is nothing playing...")
    message.channel.send(`__**Server Queue**__ \n ${serverQueue.songs.map(song => `**-** ${song.title}`).join(`\n`)} \n **Now Playing** ${serverQueue.songs[0].title}`, { split: true })
    return undefined
  }
}) 

async function play(guild, song, Channel) {
  const serverQueue = queue.get(guild.id)

  if(!song) {
    serverQueue.voiceChannel.leave()
    queue.delete(guild.id)
    return
  }
    const connection = await Channel.join(); 
    const dispatcher = connection.play(ytdl(song.url, { quality: 'highestaudio' }))
    .on('finish', () => {
      serverQueue.songs.shift()
      play(guild, serverQueue.songs[0], Channel)
    })
    .on('error', error => {
      console.log(error)
      message.channel.send("There was a error, **" + error + "**.")
    })
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5)

    serverQueue.textChannel.send(`Started playing: **${song.title}***`)

}
var http = require('http');
http.createServer(function (req, res) {
  res.write("I'm alive");
  res.end();
}).listen(8080);
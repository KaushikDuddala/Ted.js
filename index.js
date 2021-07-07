//Getting some basic Requires for stuff
const nodemon = require('nodemon')
const { prefix, token, youtubeAPI, TopGGApi } = require('./config.json');
const YouTube = require("discord-youtube-api");
const youtube = new YouTube(youtubeAPI);
const fs = require('fs');
const { Discord, Client, Collection } = require('discord.js');
const Topgg = require("@top-gg/sdk");
var unirest = require("unirest");
const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });
const Topggg = new Topgg.Api(TopGGApi)
const express = require('express')

//Command handling system
client.commands = new Collection();
const commandFolders = fs.readdirSync('./Commands');
const commandFiles = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'));


//getting the actual files and making them into commands
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./Commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./Commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

client.once('ready', async () => {
	console.log('Ready!');
})


//More command handeling stuff
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

async function createSlashCommand(element, array, index) {
  await client.application.commands.create(element)
}

client.on('message', async message => {

	if (message.content.toLowerCase() === '!deploy' && message.author.id === "747462192802168852") {
    const commands = [
      {
        name: 'ping',
        description: 'Replies with Pong!'
      },
    ]
    commands.forEach(createSlashCommand)
	}
});

client.login(token);

//MUSIC
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
    args.shift();
    const lmaoSong2 = args.join(" ")
    const songInfo = await youtube.searchVideos(lmaoSong2);
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
    let voted = await Topggg.hasVoted(message.author.id);
    if (!voted) return message.channel.send("You must vote in order to use this command, Please vote at the following link: https://up-to-down.net/259722/Vote")
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


//Starting a server for a bot to ping to keep this bot online

var app = express();
const fetch = require('node-fetch');
const FormData = require('form-data');

const axios = require("axios")
const process = require("process");
const { commands } = require('npm');
app.use(express.static(__dirname + `/Website/public`));

app.post('/', function (req, res) {
  let lol = "hai"
    const data = new FormData();
    data.append('client_id', process.env.CLIENT_ID);
    data.append('client_secret', process.env.CLIENT_SECRET);
    data.append('grant_type', 'authorization_code');
    data.append('redirect_uri', "https://Launcher.kaushikduddala.repl.co");
    data.append('scope', 'identify');
    data.append('code', req.body);

    fetch('https://discordapp.com/api/oauth2/token', {
        method: 'POST',
        body: data,
    })
        .then(response => response.json())
        .then(data=>{
            console.log(data)
            const config = {
                headers:{
                    "authorization":`Bearer ${data.access_token}`
                }
            }
            axios
                .get("https://discordapp.com/api/users/@me",config)
                .then(response=>{
                    console.log(response.data.username)
                      lol = response.data.username +"#"+response.data.discriminator

                })
                .catch(error=>{
                    console.log(error)
                })
            axios.get("https://discordapp.com/api/users/@me/guilds", config)
            .then(response => {
              let lmao2 = []
              async function lmao(element, index, array) {
                lmao2.push(response.data[index].id)
              }

              response.data.forEach(lmao)
                            const bruh = lmao2.join("|")
                            const lmao3 = `${bruh}|${lol}`
                            console.log(lmao3)
              res.send(lmao3)
            })
        })
})
app.listen(8081);

//Getting some basic Requires for plugins
const { prefix, token, youtubeAPI, TopGGApi } = require('./config.json');
const YouTube = require("discord-youtube-api");
const youtube = new YouTube
(youtubeAPI); //API code
const fs = require('fs'); //fs for file searching for Command Handeling
const Discord = require('discord.js'); //requiring discord.js
const Topgg = require("@top-gg/sdk");

 //getting prefix and token
const client = new Discord.Client({ disableEveryone: false }); //new client
const topgg = new Topgg.Api(TopGGApi)

//Command handeling system
client.commands = new Discord.Collection();
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
    //Setting the status
    client.user.setActivity("New Help Command System!", { type:"PLAYING"}).catch(console.error)
    //Slash Commands system
const getApp = (guildId) => {
    const app = client.api.applications(client.user.id)
    if (guildId) {
      app.guilds(guildId)
    }
    return app
  }
  const guildId = "814609294032633896"
  const commands = await getApp(guildId).commands.get()
  console.log(commands)
await getApp(guildId).commands.post({ 
  data:{
  name: "ping",
  description:"simple ping pong command",
  }
})
await getApp(guildId).commands.post({
  data:{
    name:"embed",
    description:"Makes a embed based on the inputs",
    options:[
      {
        name: "title",
        description:"title of the embed you want to send",
        required:true,
        type: 3
      },
      {
        name:"content",
        description:"content of the embed you want to send",
        required:true,
        type:3
      }
    ]
  }
})


  client.ws.on('INTERACTION_CREATE', async (interaction) =>{
    const { name, options } = interaction.data
    const command = name.toLowerCase()

    const args = {}

    console.log(options)

    if (options) {
      for (const option of options){
        const { name, value } = option
        args[name] = value
      }
    }
    console.log(args)
    console.log(command)
    if(command == "ping"){
      reply(interaction, "Pong!")
    }else if(command == "embed"){
      console.log(args.title)
      const NewEmbed = new Discord.MessageEmbed()
      .setTitle(args.title)
      .setDescription(args.content)
      .setColor()
      reply(interaction, NewEmbed)
    }

  })
})
const reply = async (interaction, response) => {
  let data = {
    content:response
  }
  if (typeof response === "object"){
    data = await createAPIMessage(interaction, response)
  }
        client.api.interactions(interaction.id, interaction.token).callback.post({
        data:{
          type:4,
          data,
        },
      })
}
const createAPIMessage = async (interaction, content) => {
  const { data, files } = await Discord.APIMessage.create(
    client.channels.resolve(interaction.channel_id),
    content
  )
  .resolveData()
  .resolveFiles()

  return { ...data, files }
}
// Initialize the invite cache
const invites = {};


const wait = require('util').promisify(setTimeout);

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
    console.log(args)
    args.shift();
    console.log(args)
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
    let voted = await topgg.hasVoted(message.author.id);
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
var http = require('http');
http.createServer(function (req, res) {
  res.write("I'm alive");
  res.end();
}).listen(8080);

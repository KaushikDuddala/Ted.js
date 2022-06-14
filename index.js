//Getting some basic Requires for stuff
const { prefix, token, youtubeAPI, TopGGApi } = require('./config.json');
const YouTube = require("discord-youtube-api");
const youtube = new YouTube(youtubeAPI);
const fs = require('fs');
const { Discord, Client, Collection, MessageButton } = require('discord.js');
const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });
const express = require('express')

//Command handling system
client.commands = new Collection();
const commandFolders = fs.readdirSync('./Commands');


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



//Self-Made slash commands handler
client.slashCommands = new Collection()
const slashCommandsData = []
const slashCommandsFolder = fs.readdirSync('./slashCommands')
for (const folder of slashCommandsFolder) {
	const slashCommandFiles = fs.readdirSync(`./slashCommands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of slashCommandFiles) {
		const command = require(`./slashCommands/${folder}/${file}`);
		client.slashCommands.set(command.name, command);
    if(!command.options){
      data = {
        name:command.name,
        description:command.description,
        options:[]
      }
    }else{
      data = {
        name:command.name,
        description:command.description,
        options:command.options
      }
    }
    slashCommandsData.push(data)
	}
}
client.on('message', async message => {

	if (message.content.toLowerCase() === '!deploy' && message.author.id === "747462192802168852") {
    console.log(slashCommandsData)
    const commands = await client.application.commands.set(slashCommandsData);
    console.log(commands)
	}
});
client.on('interactionCreate', interaction => {
  console.log(client.slashCommands)
	if (!interaction.isCommand()) return;
	if (!client.slashCommands.has(interaction.commandName)) return;
  try{
    client.slashCommands.get(interaction.commandName).execute(interaction);
  }catch (error) {
    console.log(error);
    interaction.reply({ content:`There was a error trying to execute that slash command! Please alert Launch.vbs#9999.`, ephemeral:true });
  };
});




client.login(token);

//MUSIC
const ytdl = require('ytdl-core')
const { Util } = require('discord.js')
const queue = new Map()

client.on('message', async message =>{
  if(message.author.bot) return

  const args = message.content.substring(prefix.length).split(" ")
  const serverQueue = queue.get(message.guild.id)


  if(message.content.startsWith(`${prefix}play`)){
    const voiceChannel = message.member.voice.channel
    console.log(voiceChannel);
    if(!voiceChannel) return message.channel.send(":x: You aren't in a voice channel. Please join one before you attempt to use the command.")
    const permissions = voiceChannel.permissionsFor(message.client.user)
    if(!permissions.has('CONNECT')) return message.channel.send("I do not have permission to join the voice channel you are currently in.")
    if(!permissions.has("SPEAK")) return message.channel.send("I do not have permission to speak in the voice channel.")
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
       playing: true,
       looped: false
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
    if(!message.member.voice.channel) return message.channel.send("Please join a voice channel first.")
    if(!serverQueue) return message.channel.send("There is nothing playing.")
    serverQueue.songs = []
    serverQueue.connection.dispatcher.end()
    message.channel.send("I have stopped music for you.")
    return undefined
  }else if (message.content.startsWith(`${prefix}skip`)){
    if(!message.member.voice.channel) return message.channel.send("Please join a voice channel first.")
    if(!serverQueue) return message.channel.send("There is nothing playing")
    serverQueue.connection.dispatcher.end()
    message.channel.send("I have skipped the music")
    return undefined
  }else if (message.content.startsWith(`${prefix}volume`) || message.content.startsWith(`${prefix}vol`)){
    if(!message.member.voice.channel) return message.channel.send("Please join a voice channel first.")
    if(!serverQueue) return message.channel.send("Nothing is playing")
    if (!args[1]) return message.channel.send(`The current volume is **${serverQueue.volume*100}**`)
    if(isNaN(args[1])) return message.channel.send("That is not a number.. Please use the numerical version such as '10' or '20'")
    serverQueue.volume = args[1]/100
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1]/100)
    message.channel.send(`I have changed the volume to ${args[1]}`)
  }else if (message.content.startsWith(`${prefix}np`)) {
      if(!serverQueue) return message.channel.send("there is nothing playing")
      message.channel.send(`Currently Playing **${serverQueue.songs[0].title}**`)
  }else if (message.content.startsWith(`${prefix}pause`)){
    if (!message.member.voice.channel) return message.channel.send("You must be in a voice channel to pause it.")
    if (!serverQueue) return message.channel.send("There is nothing playing")
    if (!serverQueue.playing) return message.channel.send("It's already paused... do unpause to unpause it.")
    serverQueue.playing = false
    serverQueue.connection.dispatcher.pause()
    message.channel.send("I have now paused the music.")
    return undefined
  }else if (message.content.startsWith(`${prefix}unpause`)) {
    if(!message.member.voice.channel) return message.channel.send("You arent in the voice channel.")
    if(!serverQueue) return message.channel.send("There isn't anything playing though, use play")
    if (serverQueue.playing == true) return message.channel.send("It's not even paused tho.")
    serverQueue.playing = true;
    serverQueue.connection.dispatcher.resume();
    serverQueue.connection.dispatcher.pause();
    serverQueue.connection.dispatcher.resume();
    return message.channel.send('▶ Audio Resumed!');
  }else if (message.content.startsWith(`${prefix}queue`)){
    if (!serverQueue) return message.channel.send("there is nothing playing...")
    message.channel.send(`Currently Playing: **${serverQueue.songs[0].title}**\nQueue: ` + '```' + serverQueue.songs.map(song => ` ${song.title}`).join(`, `) + '```')
    return undefined
  }else if(message.content.startsWith(`${prefix}help`)){
    const Discord = require('discord.js')
      const Embed = new Discord.MessageEmbed()
        .setColor("#009ff")
        .setTitle("Commands.")
        .setDescription(`\n!play [song], (plays a song in the vc you are currently in.)
        \n!stop (stops playing the song and exits the voice channel)
        \n!skip (skips the current song and goes to the next one, leaves the vc if there is no next song)
        \n!volume [volume OPTIONAL, 1-100] (sets the volume or shows the current volume
          \n!pause (Pauses the currently playing song
              \n!unpause (unpauses the song and resumes
                \n!queue (shows the current queue)
                \n!loop (Toggle, Loops the current song until !loop is said again.)`)
      message.channel.send(Embed)
  }else if (message.content.startsWith(`${prefix}loop`)) {
    if(!message.member.voice.channel) return message.channel.send("You arent in the voice channel.")
    if(!serverQueue) return message.channel.send("There isn't anything playing though, use play")
      if (serverQueue.looped == false) {
          serverQueue.looped = true
          message.channel.send(`The current song is now looping!`)
      }else{
          serverQueue.looped = false
          message.channel.send("The current song is no longer looping, if it has not finished but you wish to go to the next song do " + prefix + "skip")
      }

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
      if (serverQueue.looped) {}else{serverQueue.songs.shift()}
      play(guild, serverQueue.songs[0], Channel)
    })
    .on('error', error => {
      console.log(error)
      message.channel.send("There was a error, **" + error + "**.")
    })
    dispatcher.setVolumeLogarithmic(serverQueue.volume)

    serverQueue.textChannel.send(`Started playing: **${song.title}***`)

}


//Starting a server for a bot to ping to keep this bot online

var app = express();
app.use(express.static(__dirname + `/Website/public`));
app.listen(8081);
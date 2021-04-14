const YouTube = require('simple-youtube-api');
const youtube = new YouTube
("AIzaSyA25eGUqxnjbAEEtPjx-plIA7m6raoBTPQ");
const channel = 814884952599953459;
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const StatusUpdater = require('@tmware/status-rotate')
const client = new Discord.Client();
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
  function kewl() {
fetch('https://Launcher.kaushikduddala.repl.co')
}
  setInterval(() => {
    kewl()
  }, 1000)
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

const ytdl = require('ytdl-core');
const Util = require("discord.js"); 
const queue = new Map();

client.on('message', async msg => { // eslint-disable-line
  let message = msg;

    if (message.author.bot) return;
    if (message.channel.type === "dm") return; 
    let prefix = ">"
    if (!msg.content.startsWith(prefix)) return undefined;
 
    const args = msg.content.split(' ');
    const searchString = args.slice(1).join(' ');
    const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
    const serverQueue = queue.get(msg.guild.id);
 
    let command = msg.content.toLowerCase().split(' ')[0];
    command = command.slice(prefix.length)
    
    if (command === 'play') {
      if (!args[1]) {
            return msg.channel.send(":x: What should I play m8?")
          }
        const voiceChannel = 831960445928734731;
        if (!voiceChannel) return msg.channel.send(':x: Join a voice channel to play music!');
 
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
                await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
            }
          
           msg.channel.send("🔍 Searching `"+searchString+"`").then(msg => {
                      msg.delete(1000)
                  })
            let embed = new Discord.RichEmbed()
            .setAuthor("Music", client.user.displayAvatarURL)
            .setColor("GREEN")
            .addField("Playlist Queued", `**[${playlist.title}](${playlist.url})**`)
            .setFooter(msg.author.tag, msg.author.displayAvatarURL)
            .setTimestamp()
            return msg.channel.send(embed);
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                  msg.channel.send("🔍 Searching `"+searchString+"`").then(msg => {
                  })
                    var videos = await youtube.searchVideos(searchString);
                    let index = 0;
                
                    const videoIndex = 1;
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                } catch (err) {
                    console.error(err);
                    return msg.channel.send(':x: No result found.');
                }
            }
            return handleVideo(video, msg, voiceChannel);
        }
    } else if (command === 'youtube') {
          if (!args[0]) return msg.channel.send(":x: Please provide search query m8.")
        const voiceChannel = msg.member.voiceChannel;
        if (!voiceChannel) return msg.channel.send(':x: Join a voice channel to play music!');
        const permissions = voiceChannel.permissionsFor(msg.client.user);
        if (!permissions.has('CONNECT')) {
            return msg.channel.send(':x: I dont have connect permission.');
        }
        if (!permissions.has('SPEAK')) {
            return msg.channel.send(':x: I dont have speak permission.');
        }
 
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
                await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
            }
            msg.channel.send("🔍 Searching `"+searchString+"`").then(msg => {
                      msg.delete(1000)
                  })
            let embed1 = new Discord.RichEmbed()
            .setAuthor("Music", client.user.displayAvatarURL)
            .setColor("GREEN")
            .addField("Playlist Queued", `[${playlist.title}](${playlist.url})`)
            .setFooter(msg.author.tag, msg.author.displayAvatarURL)
            .setTimestamp()
            return msg.channel.send(embed1);
        } else{
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 5);
                    let index = 0;
                  msg.channel.send("🔍 Searching `"+searchString+"`").then(msg => {
                      msg.delete(1000)
                  })
                  let sEmbed = new Discord.RichEmbed()
                   .setAuthor("YouTube Search", msg.author.avatarURL)
                   .setColor("RANDOM")
                   .setDescription(`${videos.map(video2 => `**${++index}. [${video2.title}](${video2.url})**`).join('\n')}`)
                   .setFooter(`Provide a number of a song.`, client.user.avatarURL)
                   .setTimestamp()
                  msg.channel.send(sEmbed).then(msg => {
                      msg.delete(10000)});
                    // eslint-disable-next-line max-depth
                    try {
                        var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
              maxMatches: 1,
                            time: 10000,
                            errors: ['time']
                        });
                    } catch (err) {
                        console.error(err);
                        return msg.channel.send(':x: Invalid Value/Time\'s up, Cancelling video selection.');
                    }
                    try{
                    const videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                } catch (err) {
                    console.error(err);
                    return msg.channel.send(':x: No result found.');
                }
            } catch (err){
              console.log(err)
            }
            return handleVideo(video, msg, voiceChannel);
        }
        }
    }else if (command === 'skip') {
        if (!serverQueue) return msg.channel.send(':x: There is no song to skip.');
        serverQueue.connection.dispatcher.end(':white_check_mark: Song Skipped!');
        msg.channel.send(":white_check_mark: Song Skipped!")
        return undefined;
    } else if (command === 'stop') {
      const Channel = client.channels.cache.get("831960445928734731")
        serverQueue.songs = [];
        Channel.leave();
        msg.channel.send(":white_check_mark: Disconnected!")
        return undefined;
    } else if (command === 'join') {
        if (!msg.member.voiceChannel) return msg.channel.send(':x: You are not in a voice channel!');
        const Channel = client.channels.cache.get("831960445928734731")

        Channel.join();
        msg.channel.send(":white_check_mark: Connected!")
        return undefined;
    } else if (command === 'vol') {
        if (!msg.member.voiceChannel) return msg.channel.send(':x: You are not in a voice channel!');
        if (!serverQueue) return msg.channel.send(':x: There is nothing playing.');
        if (!args[1]) {
          let vEmbed = new Discord.RichEmbed()
          .setAuthor("Current Volume", msg.guild.iconURL)
          .setColor("ORANGE")
          .setDescription(`**${(serverQueue.volume*20)}/100**`)
          .setFooter(client.user.tag, client.user.displayAvatarURL)
        return msg.channel.send(vEmbed)}
        if (!isNaN(args[0])) {
        serverQueue.volume = args[1]/20;
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 100);
       let Embed = new Discord.RichEmbed()
          .setAuthor("Music Volume", msg.guild.iconURL)
          .setColor("ORANGE")
          .setDescription(`Volume Changed To **${args[1]}/100**.`)
          .setFooter(client.user.tag, client.user.displayAvatarURL)
        return msg.channel.send(Embed);
    } return msg.channel.send(":x: Provide a valid number between 1-100.");
    } else if (command === 'np') {
        if (!serverQueue) return msg.channel.send(':x: There is nothing playing.');
      console.log(serverQueue.songs[0])
      const nsong = {
        id: serverQueue.songs[0].id,
        title: Util.escapeMarkdown(serverQueue.songs[0].title),
        url: `https://www.youtube.com/watch?v=${serverQueue.songs[0].id}`,
        channel: serverQueue.songs[0].channel.id,
        ct: serverQueue.songs[0].channel.title,
        tp: serverQueue.songs[0].publishedAt,
        duration: serverQueue.songs[0].duration,
        thumbnail: `https://i.ytimg.com/vi/${serverQueue.songs[0].id}/maxresdefault.jpg`
    };
    } else if (command === 'queue') {
      let index = "0"
        if (!serverQueue) return msg.channel.send(':x: There is nothing playing.');
        else {
               let Embed = new Discord.RichEmbed()
                   .setAuthor("MUSIC QUEUE", msg.author.avatarURL)
                   .setColor("RANDOM")
                 //  .setThumbnail(serverQueue.songs[0].get().Thumbnail)
                   .addField("Current Song:", `**- [${serverQueue.songs[0].title}](${serverQueue.songs[0].url})**`)
                   .addField("Next Song:", `**- [${serverQueue.songs[1].title}](${serverQueue.songs[1].url})**`)
                   .setDescription("**Queue:**\n"+serverQueue.songs.map(song => `**${++index})** **[${song.title}](${song.url})**`).join('\n'))
                   .setFooter(`${client.user.username}`, client.user.avatarURL)
                   .setTimestamp()
                  msg.channel.send(Embed);
   
    } 
    } else if (command === 'pause') {
        if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            return msg.channel.send('⏸ Audio Paused!');
        }
        return msg.channel.send(':x: I am not playing anything?');
    } else if (command === 'resume') {
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            return msg.channel.send('▶ Audio Resumed!');
        }
        return msg.channel.send(':x: Please pause a song to resume.');
    }
 
    return undefined;
});
 
async function handleVideo(video, msg, voiceChannel, playlist = false) {
    const serverQueue = queue.get(msg.guild.id);
    console.log(video);
    const song = {
        id: video.id,
        title: Util.escapeMarkdown(video.title),
        url: `https://www.youtube.com/watch?v=${video.id}`,
        channel: video.channel.id,
        ct: video.channel.title,
        tp: video.publishedAt,
        duration: video.duration,
        thumbnail: `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`
    };
    if (!serverQueue) {
        const queueConstruct = {
            textChannel: msg.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 3,
            playing: true
        };
        queue.set(msg.guild.id, queueConstruct);
 
        queueConstruct.songs.push(song);
 
        try {
          const Channel = client.channels.cache.get("831960445928734731")
            var connection = await Channel.join();
            queueConstruct.connection  = connection;
            console.log(connection)
            play("763889681531404308", queueConstruct.songs[0]);
        }catch (err) {
          console.log(err)
        }
    } else {
        
        console.log(serverQueue.songs);
       
        
        if (playlist) return undefined;
        else {
          const queueConstruct = {
            textChannel: msg.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 3,
            playing: true
        };
          queueConstruct.connection  = connection;
          serverQueue.songs.push(song);
          play("763889681531404308", queueConstruct.songs[0])
        }
    }
    return undefined;
}

 
function play(guild, song) {

    const serverQueue = queue.get("814609294032633896") ;
 
    if (!song) {
        //serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
    
const Channel = client.channels.cache.get("831960445928734731")
const connection = Channel.join()
console.log(queue)
const dispatcher = serverQueue.connection.play(ytdl(song.url)).on('end', reason => {
            if (reason === 'Stream is not generating quickly enough.') {
              
              console.log('Song ended.')
             // serverQueue.textChannel.channel.send('Song Ended!');
            
            } else console.log(reason);
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on('error', error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 3);
}
http.createServer(function (req, res) {
  res.write("I'm alive");
  res.end();
}).listen(8080);
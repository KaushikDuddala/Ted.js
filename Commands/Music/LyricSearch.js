module.exports = {
  name:"lyricsearch",
  description:"Searchs a lyric",
  cooldown:10,
  args:true,
  execute(message,args) {
    async function main(message, args) {
      const fetch = require('node-fetch');
      const unirest = require("unirest");
      const discord = require('discord.js')
      const searchlol = args.join("%20")
      console.log(searchlol)
      let array = []
      let response1 = ""
      let response2 = ""
      async function foo(searchlol) {
        const lol = await fetch(`https://api.genius.com/search?q=${searchlol}`, {
        "method": "GET",
        "headers": {
          "Authorization": "Bearer YPOMqCb5a__EgmUrEgQ4XJ8daPUDoRvV1y4ErLsVIPgYLOIu4XuM2o--zmrzgC-2",
          "x-rapidapi-host": "api.genius.com",
          "access_token" : "" 
        }}).then(response => response.json()).then(response => response1 = response)
        array.push(response1.response.hits[1].result.id)
        const foofoo = await fetch(`https://api.genius.com/songs/${array[0]}?text_format=plain`, {
        "method" : "GET",
        "headers" : {
          "Authorization": "Bearer YPOMqCb5a__EgmUrEgQ4XJ8daPUDoRvV1y4ErLsVIPgYLOIu4XuM2o--zmrzgC-2",
          "x-rapidapi-host": "api.genius.com",
        }}).then(response => response.json()).then(response => response2 = response)
        array.push(response2.response.song.description.plain)
        array.push(response2.response.song.full_title)
        array.push(response2.response.song.url)
      }
      await foo(searchlol)
      const Embed = new discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle(`${array[2]}`)
        .setAuthor('Genius', 'https://tse4.mm.bing.net/th/id/OIP.SKCftG4AAippLkWbkXooSAHaHv?pid=ImgDet&rs=1', 'https://www.genius.com')
        .setDescription(`${array[1]}\n\n\n\nSong ID: ${array[0]}`)
      const row = new discord.MessageActionRow()
        .addComponents(
          new discord.MessageButton()
            .setLabel('View Lyrics.')
            .setStyle('LINK')
            .setURL(`${array[3]}`)
        );
      message.channel.send({embeds: [Embed], components: [row]})
      
    }
    main(message, args)
  }
};
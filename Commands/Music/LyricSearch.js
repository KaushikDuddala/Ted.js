module.exports = {
  name:"lyricsearch",
  description:"Searchs a lyric",
  cooldown:10,
  args:true,
  execute(message, args) {
    const fetch = require('node-fetch');
    const unirest = require("unirest");
    console.log("hello?")
    const searchlol = args.join("%20")
const lol = fetch(`https://api.genius.com/search?q=${searchlol}`, {
       "method": "GET",
       "headers": {
              "Authorization": "LgJVLcXZdib3MO6qSYKL6VKG0uwAUpGj61KO0pet832165FWitJJ6Drn7T_dZE15",
              "x-rapidapi-host": "api.genius.com"
       }}).then(response => response.json());
       console.log(lol)
  }
};
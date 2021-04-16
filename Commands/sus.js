module.exports = {
  name: "sus",
  args: true,
  execute(message, args) {
    const random = (min = 0, max = 50) => {
      let num = Math.random() * (max - min) + min;

      return Math.round(num);
    };
    async function lmao() {
          const members = await message.guild.members.random();
    }

    if (!args[0]){
      const members = message.guild.members.cache.random()
      console.log(members)
      const bruh = random(0, 1)
      if (bruh == 0) {
        message.channel.send("<@" + members.id + ">" + " was the imposter")
      }else{
        message.channel.send("<@" + members.id + ">" + " was not the imposter.")
      }
    }else{
      const user = args[0]
      const bruh = random(0, 1)
      if (bruh === 0){
        message.channel.send(user+" was the imposter.")
      }else{
        message.channel.send(user+" was not the imposter.")
      }
    }
  }
};
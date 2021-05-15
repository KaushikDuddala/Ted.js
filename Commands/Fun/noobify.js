module.exports = {
  name: "noobify",
  description: "Says if you are a noob or not :)",
  usage: "~noobify",
  cooldown:10,
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
      const members = message.member
      console.log(members)
      const bruh = random(0, 1)
      if (bruh == "0") {
        message.channel.send("<@" + members.id + ">" + " was a noob")
      }else{
        message.channel.send("<@" + members.id + ">" + " was not a nub.")
      }
    }else{
      const user = args[0]
      const bruh = random(0, 1)
      if (bruh === "0"){
        message.channel.send(user+" was a noob.")
      }else{
        message.channel.send(user+" was not a noob.")
      }
    }
  }
};
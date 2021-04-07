module.exports = {
  name: "kill",
  cooldown: 10,
  usage: 'kill <user>',
  args: true,
  execute(message, args){
    kill = ["died from nutting too hard. That's a bad way to go.",
        "drowned in a nuclear reactor, definitely a accident.."]
    const user = message.mentions.members.first();
    if (!user){
      message.channel.send("Bruh you didnt say anyone to kill.")
    }else if (user === "747462192802168852"){
      message.channel.send("They couldn't be killed. They are too powerful, they live on.")
    }else{
      const random = (min = 0, max = 50) => {
        let num = Math.random() * (max - min) + min;
        return Math.round(num);
      };
      random2 = random(0, 1)
      message.channel.send("<@" + user + "> " + kill[random2])
    }
  }
}
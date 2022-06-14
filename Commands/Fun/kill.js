module.exports = {
  name: "kill",
  description: "kills a user with a random kill message",
  cooldown: 10,
  usage: 'kill <user>',
  args: true,
  execute(message, args){
    kill = [
      "drowned in a nuclear reactor, definitely a accident..", 
    "got a bad grade", 
    "forgot to clear their browser history",
    "forgot to wear their armor",
    "put their volume too high",
    "didn't study",
    "put too many bots into the kahoot game",
    "forgot to attend class",
    "set the volume on a odd number",
    "went into the attic without turning on the light",
    "forgot to mute",
    "forgot to turn off their video",
    "didn't bring their pencil",
    "got bonked on the head",
    "forgot to turn off the oven",
    "forgot to plug in their computer",
    "forgot to lock their computer",
    "listened to `Party In The USA` ",
    "hit the older brother",
    "forgot to wear a mask",
    "didn't join the kahoot in time",
    "forgot to do the asynchronous assignment",
    "put all the bots prefix the same",
    
    ]
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
      random2 = random(0, 19)
      message.channel.send("<@" + user + "> " + kill[random2])
    }
  }
}
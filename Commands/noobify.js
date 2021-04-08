module.exports = {
	name: 'noobify',
	description: 'says if a member is a noob',
  cooldown: 10,
	execute(message, args) {
    const random = (min = 0, max = 50) => {
      let num = Math.random() * (max - min) + min;

      return Math.round(num);
    };
    const breh = require("/home/runner/Launcher/Commands/storages/noobifyStorage.js")
    let user = message.member.id;
    let bruh = 0
    noobOrNot.forEach(checkIfThere, ++bruh)
    function checkIfThere(item) {
      if (item == user) {
        message.channel.send(areYouNoob[bruh] + "test")
      }else{
        let maybe = random(0, 1);
        if (maybe === 1){
          message.channel.send("You are a noob")
          noobOrNot.push(user)
          areYouNoob.push("you are a noob >:)")
        }else{
          message.channel.send("You are not a noob, good job")
          noobOrNot.push(user)
          areYouNoob.push("You are not a noob, pog")
        }
      }
    }
    }
	};
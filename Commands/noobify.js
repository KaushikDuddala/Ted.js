module.exports = {
	name: 'noobify',
	description: 'says if a member is a noob',
  cooldown: 1000,
	execute(message, args) {
    const random = (min = 0, max = 50) => {
      let num = Math.random() * (max - min) + min;

      return Math.round(num);
    };
    let maybe = random(0, 100);
    let args2 = message.content.split(' ');
    if (args2[1] != "Close"){
    if (message.member.id === "747462192802168852"){
      message.channel.send("You are a literal god.")
    }else if (message.member.id === "585599721804922884") { 
      message.channel.send("TASKKILL /IM /F Ryan.exe \n Rename Ryan.exe Ghost-ryan.exe \n start ghost-ryan.exe")
    }else if (message.member.id === "655562499759931403"){
      message.channel.send("* crashes from too much power coming from the user * ")
    }else if (maybe > 1) {
      console.log(maybe)
      if (maybe >= 50){
      message.channel.send("You are a noob lmao")
      }else if (maybe <= 49){
      message.channel.send("You are not a noob lol")
      }
    }else if (maybe === "0"){
      let random2 = random(0, 100)
      if (random2 === "0"){
        message.channel.send("||Do `~noobify Close`||")
      }else if (random2 >= 1){
        message.channel.send("||Jebaited but close||")
      }
    }
	}else if (args[1] === "close") {
    let maybe3 = random(0, 1000)
    if (maybe3 === "0"){
      message.channel.send("||Dm me this code: `ALPOI`||")
    }else{
      message.channel.send("Not there yet lmao")
    }
  } 
}
};
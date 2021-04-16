module.exports = {
  name: "clear",
  description: "clears Chat",
  execute(message, args) {
    var yes = message.content
    var no = yes.includes("~clearchat")
    let args2 = message.content.split(' ');
    if (no === true) {
      if (message.member.hasPermission('MANAGE_MESSAGES')) {
        if (args2[1] >= 100) {
          while (args2[1] >= 100) {
            message.channel.bulkDelete(100)
            args2[1] = args2[1] - 100
          }
          if (args2[1] > 0){
          message.channel.bulkDelete(args2[1])
          }else{
            message.channel.send(args2[1] + " Messages Cleared")
          }
        }else{
          message.channel.bulkDelete(args2[1]).then(messages => console.log(`Bulk deleted ${messages.size} messages`))
          .catch(console.error);
          message.channel.send(args2[1] + " messages cleared");
        }
      }else {
        message.channel.send("You dont have permission lol")
      }
    }else{

    }
  }
}

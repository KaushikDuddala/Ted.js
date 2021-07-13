module.exports = {
    name:"ping",
    description:"replies with pong",
    execute(interaction){
        interaction.reply({ content:"Pong!", ephemeral:true })
    }
}
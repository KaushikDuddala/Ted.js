module.exports = { 
    name : "ping",
    description : "Sends Pong!",
    execute(interaction) {
        interaction.reply({ content:"Pong!" })
    }
}
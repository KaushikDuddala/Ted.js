const { discordSort } = require('discord.js/src/util/Util');

module.exports = {
    name: 'trivia',
    description: 'Play Trivia!',
    cooldown:10,
    args:false,
    usage:"~trivia",
    execute(message, args) {     
        async function main(message, args) {
            const { MessageActionRow, MessageSelectMenu, MessageEmbed, MessageButton } = require('discord.js');
            const Questions = new MessageSelectMenu()
            .setCustomId('Questions')
            .setPlaceholder('How Many Questions?')
            .addOptions([
                {
                    label:'1',
                    description:"1 Question.",
                    value:"?amount=1"
                },
                {
                    label:'2',
                    description:"2 Questions.",
                    value:"?amount=2"
                },
                {
                    label:'3',
                    description:"3 Questions.",
                    value:"?amount=3"
                },
                {
                    label:'4',
                    description:"4 Questions.",
                    value:"?amount=4"
                },
                {
                    label:'5',
                    description:"5 Questions.",
                    value:"?amount=5"
                },
                {
                    label:'6',
                    description:"6 Questions.",
                    value:"?amount=6"
                },
                {
                    label:'7',
                    description:"7 Questions.",
                    value:"?amount=7"
                },
                {
                    label:'8',
                    description:"8 Question.",
                    value:"?amount=8"
                },
                {
                    label:'9',
                    description:"9 Question.",
                    value:"?amount=9"
                },
                {
                    label:'10',
                    description:"10 Question.",
                    value:"?amount=10"
                }
            ])
            const Difficulty = new MessageSelectMenu().setCustomId('Difficulty').setPlaceholder('Which difficulty would you like?').addOptions([
                {
                    label:"easy",
                    description:"for people with little to no knowdledge on trivia.",
                    value:"&difficulty=easy"
                },
                {
                    label:"medium",
                    description:"for people with a mediocre knowdledge on trivia.",
                    value:"&difficulty=medium"
                },
                {
                    label:"HARD",
                    description:"for people with extensive knowdledge on trivia.",
                    value:"&difficulty=hard"
                },
                {
                    label:"random",
                    description:"The difficulty is randomized for each question.",
                    value:"none"
                }
            ])
            const Category1 = new MessageSelectMenu().setCustomId('Category').setPlaceholder('Which category would you like.').addOptions([
                {
                    label:'Any',
                    description:'Chooses random categories.',
                    value:"none",
                },
                {
                    label:"General",
                    description:"Trivia based on General.",
                    value:"&category=9"
                },
                {
                    label:"Books",
                    description:"Trivia based on books",
                    value:"&category=10"
                },
                {
                    label:"Films",
                    description:"Trivia based on films.",
                    value:"&category=11"
                },
                {
                    label:"Music",
                    description:"Trivia Based on music",
                    value:"&category=12"
                },
                {
                    label:"Musicals.",
                    description:"Trivia based on musicals events.",
                    value:"&category=13"
                },
                {
                    label:"Television",
                    description:"Trivia based on televison",
                    value:"&category=14"
                },
                {
                    label:"Video Games.",
                    description:"Trivia based on video games.",
                    value:"&category=15"
                },
                {
                    label:"Board Games",
                    description:"Trivia based on bored games.",
                    value:"&category=16"
                },
                {
                    label:"Science and Nature",
                    description:"Trivia based on science",
                    value:"&category=17"
                },
                {
                    label:"Computers",
                    description:"Trivia based on computers",
                    value:"&category=18"
                },
                {
                    label:"Math.",
                    description:"Trivia based on Math",
                    value:"&category=19"
                },
                {
                    label:"Mythology",
                    description:"Trivia based on mythology",
                    value:"&category=20"
                },
                {
                    label:"Sports",
                    description:"Trivia based on sports.",
                    value:"&category=21"
                },
                {
                    label:"Geography",
                    description:"Trivia based on geography",
                    value:"&category=22"
                }
            ])
            const startButton = new MessageButton()
            message.channel.send({content: "How many questions would you like? 1-10.", components: [[Questions]]})
            console.log("BRUV")
            let path = `https://opentdb.com/api.php`
            async function filterForQuestions(i) {
                console.log(i)
                return i.customId === 'Questions' && i.user.id === message.author.id;
            }
            async function filterForDifficulty(i) {
                console.log(i)
                return i.customId === 'Difficulty' && i.user.id === message.author.id
            }
            async function filterForCategory(i) {
                console.log(i)
                return i.customId === "Category" && i.user.id === message.author.id
            }
            async function update(content, component, interaction, value) {
                console.log(interaction)
                if(interaction.customId == 'Questions'){
                    interaction.update({ content: content, components: [[component]] })
                    path = `${path}${value}`
                    message.channel.awaitMessageComponent({ filterForDifficulty, time:15000 })
                    .then(interaction2 => update("Which category would you like", Category1, interaction2, interaction2.values.join("")))
                    .catch(console.error)
                }else if(interaction.customId == "Difficulty") {
                    if (value == "none") {
                        path = path
                    }else{
                        path = `${path}${value}`
                    }
                    interaction.update({ content: content, components: [[component]] })
                    message.channel.awaitMessageComponent({ filterForCategory, time:15000 })
                    .then(i => update("Starting...", "none", i, i.values.join("")))
                    .catch(console.error);

                }else if (interaction.customId == "Category") {
                    if (value == "none") {
                        path = path
                    }else {
                        path = `${path}${value}`
                    } 
                    console.log(path)
                    interaction.update({ components: [[startButton]] })
                }
            }
            message.channel.awaitMessageComponent({ filterForQuestions, time: 15000 })
            .then(interaction => update("Which difficulty would you like?", Difficulty, interaction, interaction.values.join("")))
            .catch(console.error)
        }  
        main(message, args) 
    }
}
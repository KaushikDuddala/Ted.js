module.exports = {
    name: 'trivia',
    description: 'Play Trivia!',
    cooldown:10,
    args:false,
    usage:"~trivia",
    execute(message, args) {     
        async function main(message, args) {
            const { MessageActionRow, MessageSelectMenu, MessageEmbed, MessageButton } = require('discord.js');
            const fetch = require('node-fetch')
            const Questions = new MessageSelectMenu()
            .setCustomId('Questions')
            .setPlaceholder('How Many Questions?')
            .addOptions([
                {
                    label:'1',
                    description:"1 Question.",
                    value:"1"
                },
                {
                    label:'2',
                    description:"2 Questions.",
                    value:"2"
                },
                {
                    label:'3',
                    description:"3 Questions.",
                    value:"3"
                },
                {
                    label:'4',
                    description:"4 Questions.",
                    value:"4"
                },
                {
                    label:'5',
                    description:"5 Questions.",
                    value:"5"
                },
                {
                    label:'6',
                    description:"6 Questions.",
                    value:"6"
                },
                {
                    label:'7',
                    description:"7 Questions.",
                    value:"7"
                },
                {
                    label:'8',
                    description:"8 Question.",
                    value:"8"
                },
                {
                    label:'9',
                    description:"9 Question.",
                    value:"9"
                },
                {
                    label:'10',
                    description:"10 Question.",
                    value:"10"
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
                .setCustomId("startButton")
                .setLabel("Start!")
                .setStyle("PRIMARY")
            const startButtonDisabled = new MessageButton()
                .setCustomId("startButtonDisabled")
                .setLabel("Start!")
                .setStyle("PRIMARY")
                .setDisabled(true)
            message.channel.send({content: "How many questions would you like? 1-10.", components: [[Questions]]})
            /* Randomize array in-place using Durstenfeld shuffle algorithm */
            async function shuffleArray(array) {
                for (var i = array.length - 1; i > 0; i--) {
                    var j = Math.floor(Math.random() * (i + 1));
                    var temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }
                return array
            }
            async function waitForFinish(valueToCheck, futureValue) {
                if(valueToCheck == futureValue) {
                    return "done"
                }else{
                    setTimeout(function(){
                        waitForFinish(valueToCheck, futureValue)
                    }, 50)
                }
            }
            async function startGame(message, counter, questionCount){
                await fetch(path).then(response => response.json()).then(response => responseGlobal = response)
                if (!responseGlobal.response_code == 0) return message.edit(`I had an error while getting the questions, error code: ${responseGlobal.response_code}, please report this to Launch.vbs#9999`)
                if (questionCount == NaN) return message.edit("I had an error while getting the question count.")
                const question = responseGlobal.results[0]
                const answers = await question.incorrect_answers.push(question.correct_answer)
                const shuffledAnswers = shuffleArray(question.incorrect_answers)
                console.log(question)
                if (question.type == "multiple"){
                    console.log(shuffledAnswers)
                    console.log(question.incorrect_answers)
                    if (question.incorrect_answers[0].length > 25) return startGame(message, counter, questionCount)
                    if (question.incorrect_answers[1].length > 25) return startGame(message, counter, questionCount)
                    if (question.incorrect_answers[2].length > 25) return startGame(message, counter, questionCount)
                    if (question.incorrect_answers[3].length > 25) return startGame(message, counter, questionCount)
                    const optionsDropDown = new MessageSelectMenu()
                        .setCustomId("Answer")
                        .setPlaceholder("Pick your answer here!")
                        .addOptions([
                            {
                                label:question.incorrect_answers[0],
                                description:question.incorrect_answers[0],
                                value:question.incorrect_answers[0]
                            },
                            {
                                label:question.incorrect_answers[1],
                                description:question.incorrect_answers[1],
                                value:question.incorrect_answers[1]
                            },
                            {
                                label:question.incorrect_answers[2],
                                description:question.incorrect_answers[2],
                                value:question.incorrect_answers[2]
                            },
                            {
                                label:question.incorrect_answers[3],
                                description:question.incorrect_answers[3],
                                value:question.incorrect_answers[3]
                            },
                        ])
                    message.edit({ content:question.question, components:[[optionsDropDown]] })
                    await message.channel.awaitMessageComponent({ filterForQuestions, time: 60000 })
                    .then(async i => {
                        if(i.values[0] == question.correct_answer){
                            i.update({ content:"Correct!", components:[] })
                        }else{
                            i.update({ content:"Incorrect.", components:[] })
                        }
                        console.log("buhoriginal")
                        counter++
                        console.log("Buh")
                        console.log(questionCount + " " + counter)
                        if(questionCount > counter){
                            console.log("MAn")
                            const thingy = await i.channel.send({ content: "Starting next question!"})
                            startGame(thingy, counter, questionCount)
                        }
                    })
                    .catch(console.error)
                }else if(question.type == 'boolean') {
                    if (question.incorrect_answers[0].length > 25) return startGame(message, counter, questionCount)
                    if (question.incorrect_answers[1].length > 25) return startGame(message, counter, questionCount)
                    const optionsDropDown = new MessageSelectMenu()
                        .setCustomId("Answer")
                        .setPlaceholder("Pick your answer here!")
                        .addOptions([
                            {
                                label:question.incorrect_answers[0],
                                description:question.incorrect_answers[0],
                                value:question.incorrect_answers[0]
                            },
                            {
                                label:question.incorrect_answers[1],
                                description:question.incorrect_answers[1],
                                value:question.incorrect_answers[1]
                            }
                        ]) 
                    message.edit({ content:question.question, components:[[optionsDropDown]] })
                    await message.channel.awaitMessageComponent({ filterForQuestions, time: 60000 })
                    .then(async i => {
                        if(i.values[0] == question.correct_answer){
                            i.update({ content:"Correct!", components:[] })
                        }else{
                            i.update({ content:"Incorrect.", components:[] })
                        }
                        console.log("buhoriginal")
                        counter++
                        console.log("Buh")
                        if(!questionCount == counter){
                            console.log("MAn")
                            const thingy = await i.channel.send({ content: "Starting next question!"})
                            startGame(thingy, counter, questionCount)
                        }

                    })
                }
            }
            let path = `https://opentdb.com/api.php`
            let responseGlobal = ""
            let questionCount = 0
            async function filterForQuestions(i) {
                return i.customId === 'Questions' && i.user.id === message.author.id;
            }
            async function filterForDifficulty(i) {
                return i.customId === 'Difficulty' && i.user.id === message.author.id
            }
            async function filterForCategory(i) {
                return i.customId === "Category" && i.user.id === message.author.id
            }
            async function filterForStart(i) {
                return i.customId === "startButton" && i.user.id === message.author.id
            }
            async function update(content, component, interaction, value) {
                if(interaction.customId == 'Questions'){
                    interaction.update({ content: content, components: [[component]] })
                    path = `${path}?amount=1`
                    questionCount = interaction.values[0].match(/\d+/)[0]
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
                    interaction.update({ content:"_ _",components: [[startButton]] })
                    interaction.channel.awaitMessageComponent({ filterForStart, time: 15000 })
	                    .then(i => update("Starting!", "none", i, "none"))
	                    .catch(console.error);
                }else if (interaction.customId == "startButton") {
                    interaction.update({ content:"_ _", components: [[startButtonDisabled]] })
                    console.log(questionCount)
                    console.log("BRU")
                    const thingy = await message.channel.send({ content:"Starting!" })
                    let i = 0
                    let man = "wait"
                    if (questionCount == 1) {
                        startGame(thingy, i, questionCount)
                    }else{
                            startGame(thingy, 0, questionCount)
                    }
                }
            }
            message.channel.awaitMessageComponent({ filterForQuestions, time: 15000 })
            .then(interaction => update("Which difficulty would you like?", Difficulty, interaction, interaction.values.join("")))
            .catch(console.error)
        }  
        main(message, args) 
    }
}
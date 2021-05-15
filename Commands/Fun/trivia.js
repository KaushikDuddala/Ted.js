module.exports = {
	name: 'trivia',
	description: 'Play Trivia!',
  cooldown:10,
  args:false,
  usage:"~trivia",
	execute(message, args) {
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
trivia = ['In what year were the first Air Jordan sneakers released? \n A = 1973 \n B = 1984 \n C = 1988 \n D = 1977', 'B', 
        'Who made this Trivia plugin >:) \n A = Rpergy AKA Ryan \n B = Direjack \n C = Launch.vbs AKA Minecraft Man \n Sudev AKA Whiny Dumbreon', 'C',
        'In a website browser address bar, what does “www” stand for? \n A = World Wide Web \n B = World With Web \n C = World While Web \n D = Winking World Web', 'A',
        'In a bingo game, which number is represented by the phrase “two little ducks”? \n A = 2 \n B = 91273 \n C = 103 \n D = 22', 'D',
        'According to Greek mythology, who was the first woman on earth? \n A = Pandora \n B = Athena', 'A',
        'Which author wrote the ‘Winnie-the-Pooh’ books? \n A = Shannon M. Pooh \n B = Alex A. Milne', 'B',
        'Which country consumes the most chocolate per capita? \n A = Switzerland \n B = America', 'A',
        'Which two U.S. states don’t observe Daylight Saving Time? \n A = Michigan and Utah \n B = Arizona And Hawaii', 'B',
        ]
function main(){
    num = getRandomInt(10)
    if ( num % 2 == 0) {
        message.channel.send(trivia[num])
        message.channel.send("React to the answer choice you choose in the message in which you said ~trivia!")
        message.react('🇦').then(() => message.react('🇧'));
        message.react('🇨').then(() => message.react('🇩'));
        const filter = (reaction, user) => {
	        return ['🇦', '🇧', '🇨', '🇩'].includes(reaction.emoji.name) && user.id === message.author.id;
        };

        message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	    .then(collected => {    
		const reaction = collected.first();

		if (reaction.emoji.name === '🇦') {
			if (trivia[num + 1] === 'A'){
                message.channel.send('someone knows their facts! !')
            }else {
                message.channel.send('Oof thats wrong')
            }
        }else if (reaction.emoji.name === '🇧') {
            if (trivia[num + 1] == "B") {
                message.channel.send("someone knows their facts! ")
            
            }else{
                message.channel.send("Oof thats wrong")
            }
        }else if (reaction.emoji.name === '🇨')   {
            if (trivia[num + 1] == "C") {
                message.channel.send("someone knows their facts! !")
            }else {
                message.channel.send("Oof thats wrong.")
            }
        }else if (reaction.emoji.name === '🇩'){
            if (trivia[num+1] == "D"){
                message.channel.send("someone knows their facts! !")
            }else { 
                message.channel.send("Oof thats wrong.")
            }
        }
	})
	.catch(collected => {
		message.reply('You added a different reaction or did not react. Either dont play the game or play the game right.');
	});
    }else{
        main()
    }
  } 
  main();   
}
}
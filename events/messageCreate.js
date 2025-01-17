const { Events } = require('discord.js');


module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
        if(!message.author.bot){
            if(message.content == "hi"){
                message.reply( {content:`I detected  ${message.content}`})
            }
            
        }
	},
};

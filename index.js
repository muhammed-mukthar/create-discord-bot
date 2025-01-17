const dotenv = require("dotenv");

const { Client, Events, GatewayIntentBits } = require('discord.js');
dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent,] });

   
   
client.on(Events.ClientReady, readyClient => {
  console.log(`Logged in as ${readyClient.user.tag}!`);
});

client.on(Events.MessageCreate,(message)=>{

    if(!message.author.bot){
        if(message.content == "hi"){
            message.reply( {content:'hi from bot'})
        }
        
    }
})


client.login(process.env.DISCORD_TOKEN);

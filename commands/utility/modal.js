const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
  .setName('showmodal')
  .setDescription('command to show a modal.')
  ,
  async execute(interaction) { // Correctly mark the function as async and pass interaction as a parameter
    const modal = new ModalBuilder()
      .setCustomId(`myModal ${interaction.user.id}`) // Use setCustomId and setTitle
      .setTitle("My Modal");

    const favouriteColorInput = new TextInputBuilder()
      .setCustomId("favouriteColorId")
      .setLabel("What is your favorite color?")
      .setStyle(TextInputStyle.Short);

    const hobbieInputHolder = new TextInputBuilder()
      .setCustomId("hobbieInput")
      .setLabel("What are your hobbies?")
      .setStyle(TextInputStyle.Paragraph);

    const firstActionRow = new ActionRowBuilder().addComponents(favouriteColorInput); // Correct syntax for ActionRowBuilder
    const secondActionRow = new ActionRowBuilder().addComponents(hobbieInputHolder);

    modal.addComponents(firstActionRow, secondActionRow);

    await interaction.showModal(modal); // Use interaction to show the modal
const filter= (interaction)=>interaction.customId ==`myModal ${interaction.user.id}`
await interaction.awaitModalSubmit({filter:filter,time:30_000}).then((modalInteraction)=>{
    const favouriteColorValue=modalInteraction.fields.getTextInputValue('favouriteColorId')
    const hobbieInputValue=modalInteraction.fields.getTextInputValue('hobbieInput')
    modalInteraction.reply(`your favourite color is ${favouriteColorValue}  and your hobbie is ${hobbieInputValue} `)

}).catch((err)=>{
    console.log(err)
})
}
};

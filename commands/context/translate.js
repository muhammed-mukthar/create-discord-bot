const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Translate text!')
        .setType(ApplicationCommandType.Message),  // Message context menu
    async execute(interaction) {
        console.log('interaction.commandName', interaction.commandName);

        // Check if it's the correct context menu interaction
        if (interaction.isMessageContextMenuCommand() && interaction.commandName === 'Translate text!') {
            const messageContent = interaction.targetMessage.content;

            await interaction.reply({
                content: `Original Message: "${messageContent}", translating...`,
                ephemeral: true,
            });

            // Add logic for translation here if needed
        }
    },
};

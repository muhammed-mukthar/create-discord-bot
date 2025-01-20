const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Say Hello!')
        .setType(ApplicationCommandType.User),  // Set to 'User' for user context menu, or 'Message' for message context menu
    async execute(interaction) {
        console.log('interaction.commandName', interaction.commandName);

        // Respond when the context menu is used
        if (interaction.isUserContextMenuCommand()  && interaction.commandName==='Say Hello!') {
            await interaction.reply({
                content: `Hello, ${interaction.targetUser.username}!`,
                ephemeral: true,
            });
        }
        // If it's a message context menu command
        if (interaction.isMessageContextMenuCommand()) {
            await interaction.reply({
                content: `You right-clicked on a message!`,
                ephemeral: true,
            });
        }
    },
};

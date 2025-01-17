const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('car')
		.setDescription('Replies with i love cars!'),
	async execute(interaction) {
		await interaction.reply('i love cars!');
	},
};

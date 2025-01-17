const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('car')
		.setDescription('Replies with i love cars!'),
	async execute(interaction) {
		await interaction.deferReply();
		await wait(4_000);
		await interaction.editReply('i love cars!');

	},
};

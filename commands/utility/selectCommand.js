const { ActionRowBuilder } = require("discord.js");
const {
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pokemon")
    .setDescription("pokemon a command."),
  async execute(interaction) {
    const select = new StringSelectMenuBuilder()
      .setCustomId("starter")
      .setPlaceholder("Make a selection!")
      .addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel("Bulbasaur")
          .setDescription("The dual-type Grass/Poison Seed Pokémon.")
          .setValue("bulbasaur"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Charmander")
          .setDescription("The Fire-type Lizard Pokémon.")
          .setValue("charmander"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Squirtle")
          .setDescription("The Water-type Tiny Turtle Pokémon.")
          .setValue("squirtle")
      );

    const row = new ActionRowBuilder().addComponents(select);

    await interaction.reply({
      content: "Choose your starter!",
      components: [row],
    });
    const filter = (i) => i.customId === "starter" && i.user.id === interaction.user.id;

    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      time: 60000, // 60 seconds
    });

    collector.on("collect", async (i) => {
      const selected = i.values[0]; // Get the selected value
      await i.reply(`You selected: ${selected}!`);
      collector.stop(); // Stop the collector after the reply
    });

    collector.on("end", (collected, reason) => {
      if (reason === "time") {
        interaction.followUp("You didn't make a selection in time!");
      }
    });
    },
};

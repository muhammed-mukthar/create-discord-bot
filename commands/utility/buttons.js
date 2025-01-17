const {
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  cooldown: 50,
  data: new SlashCommandBuilder()
    .setName("buttons")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    const target = interaction.options.getUser("target");
    const reason =
      interaction.options.getString("reason") ?? "No reason provided";

    const confirm = new ButtonBuilder()
      .setCustomId("confirm")
      .setLabel("Confirm Ban")
      .setStyle(ButtonStyle.Danger);
    const Link = new ButtonBuilder()
      .setLabel("discord.js docs")
      .setURL("https://discord.js.org")
      .setStyle(ButtonStyle.Link);

    const cancel = new ButtonBuilder()
      .setCustomId("cancel")
      .setLabel("Cancel")
      .setStyle(ButtonStyle.Secondary);
    const disabled = new ButtonBuilder()
      .setCustomId("disabled")
      .setLabel("Click me?")
      .setStyle(ButtonStyle.Primary)
      .setDisabled(true);

    const emojiButton = new ButtonBuilder()
      .setCustomId("primary")
      .setLabel("Primary")
      .setStyle(ButtonStyle.Primary)
      .setEmoji("🔥"); // Unicode emoji used here

    const row = new ActionRowBuilder().addComponents(
      cancel,
      confirm,
      Link,
      disabled,
      emojiButton
    );

    await interaction.reply({
      content: `Are you sure you want to ban ${target} for reason: ${reason}?`,
      components: [row],
    });
  },
};

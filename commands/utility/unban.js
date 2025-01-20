const {
    SlashCommandBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
  } = require("discord.js");
  
  module.exports = {
    cooldown: 50,
    data: new SlashCommandBuilder()
      .setName("unban")
      .setDescription("un ban a user!")
      .addUserOption((option) =>
        option.setName("target").setDescription("User to unban").setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("reason")
          .setDescription("Reason for the ban")
          .setRequired(false)
      ),
    async execute(interaction) {
      const target = interaction.options.getUser("target");
      const reason = interaction.options.getString("reason") ?? "No reason provided";
  
      const confirm = new ButtonBuilder()
        .setCustomId("confirm")
        .setLabel("Confirm Un Ban")
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
  
      // Send the initial message with buttons
      await interaction.reply({
        content: `Are you sure you want to un ban ${target.username} for reason: ${reason}?`,
        components: [row],
      });
  
      // Fetch the reply message
      const message = await interaction.fetchReply();
  
      // Collector filter to ensure only the command user can interact
      const collectorFilter = (i) => i.user.id === interaction.user.id;
  
      try {
        // Await the user's button interaction
        const confirmation = await message.awaitMessageComponent({
          filter: collectorFilter,
          time: 60_000,
        });
  
        if (confirmation.customId === "confirm") {
          // Perform the ban (uncomment the line below in a real bot)
          await message.guild.members.unban(target);
          await confirmation.update({
            content: `${target.username} has been banned for reason: ${reason}`,
            components: [],
          });
        } else if (confirmation.customId === "cancel") {
          await confirmation.update({
            content: "Action cancelled",
            components: [],
          });
        }
      } catch (error) {
        // Handle timeout or errors
        await interaction.editReply({
          content: "Confirmation not received within 1 minute, cancelling.",
          components: [],
        });
      }
    },
  };
  
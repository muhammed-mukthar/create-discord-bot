const {
  Events,
  bold,
  italic,
  strikethrough,
  underline,
  spoiler,
  quote,
  blockQuote,
  subtext,
} = require("discord.js");

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (!message.author.bot) {
      if (message.content == "hi") {
        const stringText = "I detected";
        const boldString = bold(stringText);
        const italicString = italic(stringText);
        const strikethroughString = strikethrough(stringText);
        const underlineString = underline(stringText);
        const spoilerString = spoiler(stringText);
        const quoteString = quote(stringText);
        const blockquoteString = blockQuote(stringText);
        const subtextString = subtext(stringText);

        message.reply({
          content: `${boldString}  ${message.content}
          ${italicString}  ${message.content}
           ${strikethroughString}  ${message.content}
           ${underlineString}  ${message.content}
           ${spoilerString}  ${message.content}
           ${quoteString}  ${message.content}   
         ${subtextString}  ${message.content}   
         ${blockquoteString}  ${message.content}
`,
        });
      }
    }
  },
};

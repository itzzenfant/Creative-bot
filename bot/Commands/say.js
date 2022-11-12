const discord = require("discord.js")

module.exports = {
  name: "say",
  description: "Permet d'envoyer un message sous l'identiter du bot",
  permission: discord.PermissionFlagsBits.Administrator,
  dm: false,
  category: "Fun",
  options: [
    {
      type: "string",
      name: "message",
      description: "Le message a ecrire",
      required: true,
      autocomplete: false
    }
      ],
    
    async run(enfant, message, args) {

    const msg = args.getString("message");
    message.channel.send(msg);
   await message.reply({content: ':white_check_mark: **message envoyer avec succes ! **:white_check_mark:', ephemeral: true})

}
}
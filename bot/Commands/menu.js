const Discord = require("discord.js")
const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")
const { color } = require('../config')
 
module.exports = {
 
  name: "menu",
  description: "Envoyer un menu de selection",
  permission:  Discord.PermissionFlagsBits.Administrator,
  dm: false,
  category: "Administration",
 
  async run(bot, message, args) {
    const as = new EmbedBuilder()
    .setColor(bot.color)
    .setDescription(`✅ L'embed des menu à été envoyer avec succès !`)
 
    const Embed8 = new EmbedBuilder()
    .setColor(bot.color)
    .setTitle(`Menu de selection`)
    .setDescription(`Voici un menu de selection`)
    .setTimestamp()
 
    const su = new ActionRowBuilder()
			.addComponents(
      new SelectMenuBuilder()
      .setCustomId('test')
      .setPlaceholder('Sélectionner le type de ticket que vous voulez !')
      .addOptions(
        {
          label: `message de test`,
          description: `Avoue c'est styler`,
          emoji: `🔺`,
          value: `test`,
        },
        {
          label: `demandé le ping`,
          description: `revoie le ping`,
          emoji: `❗`,
          value: `ping`,
        },
        {
          label: `Les nouveaux salon`,
          description: `la documentation des forum !`,
          emoji: `🤖`,
          value: `forum`,
        },
        {
          label: `Les partenariat du serveur`,
          description: `Les partenariat du serveurs !`,
          emoji: `📜`,
          value: `part`,
        }
      ),
    );

    var bouton = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId("boutton")
        .setEmoji('<:forum:1024724243314909234>')
        .setLabel('crée un forum')
        .setStyle(ButtonStyle.Secondary)
     );

     var suppp = new ActionRowBuilder()
     .addComponents(
       new ButtonBuilder()
         .setCustomId("sup")
         .setEmoji('❗')
         .setLabel('supprimer un channel')
         .setStyle(ButtonStyle.Secondary)
      );
 
    await message.reply({embeds: [as], ephemeral: true})
    await message.channel.send({embeds: [Embed8], components: [su]})
    await message.channel.send({components: [bouton]})
    await message.channel.send({components: [suppp]})
  }
}
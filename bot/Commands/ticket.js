const Discord = require("discord.js")
const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js")
 
module.exports = {
 
  name: "ticket",
  description: "Permet d'nvoyer l'embed des tickets",
  permission:  Discord.PermissionFlagsBits.Administrator,
  dm: false,
  category: "Modération",
 
  async run(enfant, message, args) {
    const EmbedTicket = new EmbedBuilder()
    .setColor(enfant.color)
    .setDescription(`✅ L'embed des ticket à été envoyer avec succès !`)
 
    const EmbedTicket1 = new EmbedBuilder()
    .setColor(enfant.color)
    .setTitle(`<:DiscordCompass:1028260012797198375>  Ouvrir un ticket`)
    .setDescription(`Tu as besoin de nous contacter ? Tu es au bon endroit ! :ok_hand: Sélectionne la raison du ticket dans le menu de sélection juste en dessous et nous ouvrirons un channel pour parler avec toi.`)
    .setImage("https://cdn.discordapp.com/attachments/1026163129786310747/1033411050340630660/unknown.png")
    .setTimestamp()
 
    const RowTicket = new ActionRowBuilder()
			.addComponents(
      new SelectMenuBuilder()
      .setCustomId('menuticket')
      .setPlaceholder('Sélectionner le type de ticket que vous voulez !')
      .addOptions(
        {
          label: `Besoin d'aide`,
          description: `Ouvrir un ticket pour obtenir de l'aide`,
          emoji: `<:DiscordStaff:1028008686540562559>`,
          value: `help`,
        },
        {
          label: `Boost`,
          description: `Tu a boost le serveur ?`,
          emoji: `<a:BoosterBadgesRoll:1029969705106157640>`,
          value: `boost`, 
        },
        {
          label: `partenariat`,
          description: `faire un partenairat avec le serveur`,
          emoji: `<:DiscordPartner:1028001171379589300>`,
          value: `part`, 
        },
        {
          label: `annuler`,
          description: `Annuler l'interaction du ticket`,
          emoji: `❌`,
          value: `stop`, 
        }
      ),
    );
 
    await message.reply({embeds: [EmbedTicket], ephemeral: true})
    await message.channel.send({embeds: [EmbedTicket1], components: [RowTicket]})
  }
}
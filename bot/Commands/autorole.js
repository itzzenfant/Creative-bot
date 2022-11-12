const Discord = require("discord.js")
const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

module.exports = {
    name: "autorole",
    description: "Permet d'envoye l'embed d'autorole",
    permission: Discord.PermissionFlagsBits.Administrator,
    dm: true,
    category: "Modération",

    async run(enfant, message, args) {

    const autorole = new EmbedBuilder()
    .setColor(enfant.color)
    .setDescription(`✅ L'embed des autorole à été envoyer avec succès !`)

    const selec = new EmbedBuilder()
    .setColor(enfant.color)
    .setTitle(`Menu selection de role !`)
    .setDescription(`Voici un menu de selection de role !`)
    .setImage("https://cdn.discordapp.com/attachments/1026163129786310747/1033412205330309262/unknown.png")
    .setTimestamp()
 
    const su = new ActionRowBuilder()
	.addComponents(
      new SelectMenuBuilder()
      .setCustomId('autorole')
      .setPlaceholder('Sélectionner le type de role que vous voulez !')
      .addOptions(
        {
          label: `Annonce`,
          description: `Permet d'avoir le role ping des annonces du serveur !`,
          emoji: `<:DiscordAnnonce:1028012918832386048>`,
          value: `annonce`,
        },
        {
          label: `Partenariat`,
          description: `Permet d'avoir le role ping des partenariats du serveur !`,
          emoji: `<:DiscordPartner:1028001171379589300>`,
          value: `part`,
        }
        ,
        {
          label: `Giveaway`,
          description: `Permet d'avoir le role ping des giveaway du serveur !`,
          emoji: `<:DiscordGiveway:1028010827661459537>`,
          value: `give`,
        }
      ),
    );

    await message.reply({embeds: [autorole], ephemeral: true})
    await message.channel.send({embeds: [selec], components: [su]})
    }
}
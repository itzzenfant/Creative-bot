const Discord = require("discord.js")
const { EmbedBuilder, TextInputBuilder, ModalBuilder, ActionRowBuilder, TextInputStyle, ButtonBuilder, ButtonStyle } = require("discord.js");
 
module.exports = {
 
  name: "demande",
  description: "Permet d'envoyer une demande",
  permission: "Aucune",
  dm: false,
  category: "Information",

  async run(enfant, message, args, member) {
 
    let Modal2 = new ModalBuilder()
    .setCustomId('demande')
    .setTitle(`Créé t'a demande`)
 
    let questiona = new TextInputBuilder()
    .setCustomId('titre')
    .setLabel('Quel titre voulez-vous mettre ?')
    .setRequired(false)
    .setPlaceholder('Ecrit ici... (facultatif)')
    .setStyle(TextInputStyle.Short)
 
    let questionz = new TextInputBuilder()
    .setCustomId('mission')
    .setLabel("Quelle mission voulez-vous mettre ?")
    .setRequired(true)
    .setPlaceholder('Ecrit ici...')
    .setStyle(TextInputStyle.Paragraph)
 
    let questione = new TextInputBuilder()
    .setCustomId('prix')
    .setLabel('Quelle prix voulez-vous mettre ?')
    .setRequired(false)
    .setPlaceholder('Dans ce format : 10')
    .setStyle(TextInputStyle.Short)
 
    let ActionRowa = new ActionRowBuilder().addComponents(questiona);
    let ActionRowz = new ActionRowBuilder().addComponents(questionz);
    let ActionRowe = new ActionRowBuilder().addComponents(questione);
 
    Modal2.addComponents(ActionRowa, ActionRowz, ActionRowe)
 
    await message.showModal(Modal2)
 
    try {
 
      let reponse = await message.awaitModalSubmit({time: 300000})
 
      let titre = reponse.fields.getTextInputValue('titre')
      let mission = reponse.fields.getTextInputValue('mission')
      let prix = reponse.fields.getTextInputValue('prix')
 
      const EmbedBuildert = new Discord.EmbedBuilder()
      .setColor(enfant.color)
      .setDescription(`✅ Votre demande à été envoyer avec succès !`)
 
      if(!prix) prix = ''
      if(!titre) titre = ' '
      if(!mission) mission = ' '
 
      let EmbedBuilderaz = new EmbedBuilder()
      .setColor(enfant.color)
      .setDescription(`\n\n**<:DiscordWumpus:1028616294108516402> Nouvelle Demande Disponible**\n\n**<:DiscordParametre:1028009062618640435> demande : **${titre} \n\n**<:DiscordActiviter:1028009603964862565> mission :** ${mission} \n\n **💵 prix :** ${prix} € \n\n **demandé par ${message.user}**\n\n Pour poster une demande faite /demande\n\n `)
      

      var demande = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("dem")
          .setEmoji('<:DiscordChannel:1028008358348857394>')
          .setLabel('crée une discution (en dev)')
          .setStyle(ButtonStyle.Secondary)
       );

        await reponse.reply({embeds: [EmbedBuildert], ephemeral: true})

        enfant.channels.cache.get("1028624254096396299").send({ embeds: [EmbedBuilderaz], components: [demande] })
        
    } catch (err) { return; }
  }
}
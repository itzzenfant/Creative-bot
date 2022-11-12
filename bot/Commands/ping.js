const Discord = require("discord.js")
const { EmbedBuilder } = require("discord.js")

module.exports = {

  name: "ping",
  description: "Permet d'afficher la latence",
  permission: "Aucune",
  dm: true,
  category: "<:outil:1011561389292257330> outils",

  async run(enfant, message, args) {

    const EmbedPing = new EmbedBuilder()
    .setColor(enfant.color)
    .setDescription(`<a:ping:1011611766364569702> **Ping :** \`${enfant.ws.ping}\``)
    
    await message.reply({embeds: [EmbedPing]})
  }
}
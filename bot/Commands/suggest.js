const Discord = require('discord.js')
const { EmbedBuilder } = require("discord.js");
const interactionCreate = require('../Events/interactionCreate');

module.exports = {

  name: "suggest",
  description: "Permet d'envoyer une suggestion",
  permission: "Aucune",
  dm: false,
  category: "Autres",
  options: [
    {
        type: "string",
        name: "suggestion",
        description: "Le message a envoyer.",
        required: true,
        autocomplete: false
    }
],

async run(enfant, message, args) {
    message.reply({content: ':white_check_mark: **Suggestion envoyé avec succès dans <#1030744640061718528> ! **:white_check_mark:', ephemeral: true});
    let msg = args.getString("suggestion");
        const EmbedMessage  = new EmbedBuilder()
            .setTitle(`<:DiscorsChat:1028260095907332108> Nouvelle suggestion!`)
            .setColor(enfant.color)
            .setDescription(`Suggestion de ${message.user} : ${msg}`)

            enfant.channels.cache.get("1030744640061718528").send({ embeds: [EmbedMessage] }).then(function (message) {
                message.react("✅");
                message.react("❌");
                message.startThread({name: `Nouvelle suggestion`, autoArchiveDuration: 10080, reason: "Raison"});

            });
    }
}
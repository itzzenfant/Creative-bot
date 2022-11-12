const Discord = require('discord.js')
const { EmbedBuilder } = require("discord.js");
const interactionCreate = require('../Events/interactionCreate');

module.exports = {

  name: "report",
  description: "Permet de report une personne",
  permission: "Aucune",
  dm: false,
  category: "Autres",
  options: [
    {
        type: "user",
        name: "user",
        description: "La personne a report.",
        required: true,
        autocomplete: false
    },
    {
        type: "string",
        name: "raison",
        description: "La raison du report.",
        required: true,
        autocomplete: false
    },
    {
        type: "attachment",
        name: "preuve",
        description: "La preuve du report.",
        required: true,
        autocomplete: false
    }
],

async run(enfant, message, args) {
    message.reply({content: ':white_check_mark: **report envoyé avec succès ! **:white_check_mark:', ephemeral: true});
    let msg = args.getString("raison");
    let user = args.getUser("user");
    let pre = args.getAttachment("preuve");
        const EmbedMessage  = new EmbedBuilder()
            .setTitle(`Nouveau report !`)
            .setColor(enfant.color)
            .setDescription(`${message.user} a report ${user} pour la raison suivante : \`\`\`${msg}\`\`\`\n la preuve : ${pre}`)

            enfant.channels.cache.get("1026173072576872499").send({ embeds: [EmbedMessage] })
        }
}
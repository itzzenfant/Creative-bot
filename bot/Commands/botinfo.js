const Discord = require("discord.js")
const {EmbedBuilder} = require("discord.js")
const moment = require('moment')

module.exports = ({

    name: "botinfo",
    description: "Permet d'avoir les informations sur le bot",
    utilisation: "",
    permission: "Aucune",
    category: "Informations",

    async run(enfant, message, args) {
        
        let Embed = new Discord.EmbedBuilder()
        .setColor(enfant.color)
        .setTitle(`🤖${enfant.user.username}🤖`)
        .setThumbnail(enfant.user.displayAvatarURL({dynamic: true}))
        .setTimestamp()
        .setFooter({text: `${enfant.user.tag}`, iconURL: enfant.user.displayAvatarURL({dynamic: true})})
        .setImage(enfant.user.banner ? enfant.user.banner : undefined)
        .setDescription(`**✉️ Information Général ✉️\n🤖Nom : \`${enfant.user.username}\`\n🔢 Tag : \`${enfant.user.discriminator}\`\n📇Identifiant : \`${enfant.user.id}\`\nDate de création : \`${moment(enfant.user.createdTimestamp).format('MMMM Do YYYY, h:mm:ss')}\`(<t:${Math.floor(enfant.user.createdTimestamp / 1000)}:F>)\n👑 Propriétaire(dévloppeure) : \`l'enfant\`\n📊 Informations Statistics 📊\nServeur(s) \`${enfant.guilds.cache.size.toLocaleString()}\`\nSalon(s) : \`${enfant.channels.cache.size.toLocaleString()}\`\nMembres Total modérés : ${enfant.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}**`)
        await message.channel.send({embeds: [Embed] })

    }
})
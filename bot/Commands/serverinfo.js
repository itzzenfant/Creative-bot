const { EmbedBuilder } = require('discord.js');


module.exports = {
    name: "serverinfo",
    description: "Permet de donne des info sur le serveur",
    permission: "Aucune",
    dm: false,
    category: "Information",

    async run(enfant, message, args) {
        const ServerInfo = new EmbedBuilder()
        .setColor(enfant.color)
        .setTitle(`Informations sur le serveur ${message.guild.name}`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .addFields(
            { name: "Informations sur le serveur", value: `**Nom** : ${message.guild.name}\n<:DiscordOwner:1032147634057658419>: **Propriétaire** : ${(await message.guild.fetchOwner())}\n<:DiscordId:1028008683956871318>: **ID** : ${message.guild.id}\n<:DiscordActiviter:1028009603964862565>: **Description** : ${message.guild.description ? message.guild.description : "Aucune"}\n<a:BoosterBadgesRoll:1029969705106157640>: **Boost** : ${message.guild.premiumSubscriptionCount} (${message.guild.premiumTier})\n<:DiscordJoin:1028014564652089434>: **Date de création** : <t:${Math.floor(message.guild.createdAt / 1000)}:F>`},
            { name: "Informations sur les stats", value: `<:DiscordChannel:1028008358348857394>:**Salons** : ${message.guild.channels.cache.size}\n<:DiscordRole:1028192768415236096>:**Rôles** : ${message.guild.roles.cache.size}\n<:DiscordWumpus:1028616294108516402>:**Emojis** : ${message.guild.emojis.cache.size}\n<:DiscordMember:1028009058172669993>:**Membres** : ${message.guild.members.cache.size}`},
            { name: "Informations sur les salons spéciaux", value: `<:DiscordReglement:1028008692009930762>: **Règlement** : ${message.guild.rulesChannel ? message.guild.rulesChannel : "Aucun"}\n<:DiscordVocal:1028008359686836345> :**AFK** : <#1027995828134092831>`})
        .setImage(message.guild.bannerURL({ dynamic: true, size: 4096 }))
        .setTimestamp()
        .setFooter({ text: enfant.user.username, iconURL: enfant.user.displayAvatarURL({ dynamic: true }) })

         await message.reply({ embeds: [ServerInfo] })
    
        }    
    }

const Discord = require('discord.js');

module.exports = async(enfant, channels) => {

        const fetchAuditLogs = await channels.guild.fetchAuditLogs({
            type: Discord.AuditLogEvent.ChannelDelete,
            limit: 1
        })

        let channel = channels.guild.channels.cache.get("1026173072576872499")
        
        const LatestChannel = fetchAuditLogs.entries.first()
        
        let Embed = new Discord.EmbedBuilder()
        .setColor(enfant.color)
        .setTitle("Supprimation d'un salon")
        .setThumbnail(enfant.user.displayAvatarURL({dynamic: true}))
        .setDescription(`Salon : ${channels.name}\nAuteur : ${LatestChannel.executor} (${LatestChannel.executor.tag})`)
        .setFooter({text: "logs", iconURL: enfant.user.displayAvatarURL({dynamic: true})})
        .setTimestamp()
    
        channel.send({embeds: [Embed]});
    }

const Discord = require('discord.js');
const { EmbedBuilder } = require("discord.js")

module.exports = async(enfant, message) => {

            const AuditsLogs = await message.guild.fetchAuditLogs({
                type: Discord.AuditLogEvent.MessageDelete,
                limit: 1
            })

            let channel = message.guild.channels.cache.get("1026173072576872499");

            const LatestMessageDeleted = AuditsLogs.entries.first();
            
            let Embed = new EmbedBuilder()
            .setColor(enfant.color)
            .setTitle("Message supprimé")
            .setThumbnail(enfant.user.displayAvatarURL({dynamic: true}))
            .setDescription(`Auteur du message : ${message.author}\nAuteur de la suppresion : ${LatestMessageDeleted.executor}\nDate de création du message : <t:${Math.floor(message.createdAt / 1000)}:F>\nContenu : \`\`\`${message.content}\`\`\``)
            .setFooter({text: "message suprimée", iconURL: enfant.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()

            channel.send({embeds: [Embed]});
        }

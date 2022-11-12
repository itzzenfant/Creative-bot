const discord = require("discord.js")
const { EmbedBuilder } = require("discord.js") 

module.exports = async (enfant, member, message, interaction) => {

    const Responses = [
        `👋 Tout le monde, accueillez ${member} comme il se doit \n**Il a rejoin il y : <t:${parseInt(member.joinedTimestamp / 1000)}:R>**`,
        `👋 Contents de te voir ${member} \n**Il a rejoin il y : <t:${parseInt(member.joinedTimestamp / 1000)}:R>**`,
        `👋 Youhou, tu nous rejoindre ${member} \n**Il a rejoin il y : <t:${parseInt(member.joinedTimestamp / 1000)}:R>**`,
        `👋 Bienvenue, ${member}. On espère que tu as apporté de la pizza. \n**Il a rejoin il y : <t:${parseInt(member.joinedTimestamp / 1000)}:R>**`,
        `👋 ${member} vient de se glisser dans le serveur. \n**Il a rejoin il y : <t:${parseInt(member.joinedTimestamp / 1000)}:R>**`
    ];

    const EmbedTicket1 = new EmbedBuilder()
    .setColor(enfant.color)
    .setTitle(`👋 Salut`)
    .setDescription(`Merci d'avoir rejoins **Creative Community.** Tu as fais le bon choix ! \n Pense à lire nos <#1026163129786310746> ! \n Si tu perds le *discord* : https://discord.gg/FyUWB8UNR8 !`)
    .setImage("https://cdn.discordapp.com/attachments/1026535633218437221/1030842416946741319/graphiste_gbanniere.png7")

    enfant.channels.cache.get("1026163019329323021").send(`${Responses[Math.floor(Math.random() * Responses.length)]}`)
    member.send({embeds: [EmbedTicket1]})
}
const Discord = require("discord.js");
const Canvas = require('discord-canvas-easy')
const { EmbedBuilder } = require("discord.js")
const config = require("../config")


module.exports = {

    name: "profil",
    description: "Permet de voir les information d'un utilisateur",
    dm: false,
    category: "Information",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Quel utilisateur ?",
            required: false
        },
    ],

    async run(enfant, message, args, db) {

        let user
        if(args.getUser('utilisateur')) {
            user = args.getUser('utilisateur')
            if(!user || !message.guild.users.cache.get(user?.id)) return message.reply("je ne trouve pas le membre")
        } else user = message.user

            let Embed = new EmbedBuilder()
            .setColor(enfant.color)
            .setTitle(`Informations sur ${user.tag}`)
            .setThumbnail(user.displayAvatarURL({dynamic: true}))
            .setDescription(`**Informations sur l'utilisateur**\n\n **Pseudo** : ${user.username}\n**Tag** : ${user.discriminator}\n**URL de l'avatar** : [URL](${user.displayAvatarURL({dynamic: true})})\n**Robot** : ${user.bot ? "Oui" : "Non"}\n**Status** : ${user ? user.presence ? user.presence.status : "Hors-ligne" : "Inconnu"}\n**Badges** : ${(await user.fetchFlags()).toArray().length >= 1 ? (await user.fetchFlags()).toArray().join(" ") : "Non"}\n**Date de création du compte** : <t:${Math.floor(user.createdAt / 1000)}:F>\n\n\n **Informations sur l'utilisateur (du serveur)**\n\n **Surnom** : ${user.nickname ? user.nickname : "Aucun"}`)
            .setTimestamp()
            .setFooter({text: enfant.user.username, iconURL: enfant.user.displayAvatarURL({dynamic: true})})


            db.query(`SELECT * FROM xp WHERE guild = '${message.guildId}' AND user = '${user.id}'`, async (err,req) => {
            
                db.query(`SELECT * FROM xp WHERE guild = '${message.guildId}'`, async (err,all) => {
                    
                if(req.length <1 ) return message.reply("ce membre n'as pas d'xp")
    
                await message.deferReply()
    
                const calculXp = (xp, level) => {
                    let xptotal = 0
                    for(let i = 0; i < level + 1; i++) xptotal += i*10000
                    xptotal+=xp
                    return xptotal
                }
                
                let leaderboard = await all.sort(async (a, b) => calculXp(parseInt(b.xp), parseInt(b.level)) - calculXp(parseInt(a.xp), parseInt(a.level)))
                
                let xp = parseInt(req[0].xp)
                let level = parseInt(req[0].level)
                let rank = leaderboard.findIndex(r => r.user === user.id) + 1
                let need = (level+1)*10000
    
                let Card = await new Canvas.Card()
                .setBackground('./rank.png')
                .setBot(enfant)
                .setColorFont("#ffffff")
                .setRank(rank)
                .setUser(user)
                .setColorProgressBar(enfant.color)
                .setGuild(message.guild)
                .setXp(xp)
                .setLevel(level)
                .setXpNeed(need)
                .toCard()

            await message.channel.send({embeds: [Embed]})
            await message.followUp({files: [new Discord.AttachmentBuilder(Card.toBuffer(), {name: 'rank.png'})]})
    })
})
}}


const Discord = require("discord.js")

module.exports = {

    name: "setlogs",
    description: "Paramètre les logs",
    permission: Discord.PermissionFlagsBits.ManageGuild,
    dm: false,
    category: "Administration",
    options: [
        {
            type: "string",
            name: "état",
            description: "Etat des logs (on ou off)",
            required: true,
            autocomplete: false
        }, {

            type: "channel",
            name: "salon",
            description: "Salon des logs (renseigné si on)",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args, db) {

        let etat = args.getString("état")
        if(etat !== "on" && etat !== "off") return message.reply("Indique on ou off")

        if(etat === "off") {

            db.query(`UPDATE server SET logs = 'false' WHERE guild = '${message.guildId}'`)
            await message.reply("Les logs sont bien désactivé !")
        
        } else {

            let channel = args.getChannel("salon")
            if(!channel) return message.reply("Inidique un salon pour activer les logs !")
            channel = message.guild.channels.cache.get(channel.id)
            if(!channel) return message.reply("Pas de salon trouvé !")

            db.query(`UPDATE server SET logs = '${channel.id}' WHERE guild = '${message.guildId}'`)
            await message.reply(`Les logs sont bien activé sur le salon ${channel} !`)
        }
    }
}
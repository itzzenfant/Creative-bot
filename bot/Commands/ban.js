const Discord = require("discord.js")

module.exports = {

    name: "ban",
    description: "Permet de ban une personne",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "<:mod:1011561404421132359> Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "La personne a ban",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "La raison du ban",
            required: false,
            autocomplete: false
        }
    ],

    async run(enfant, message, args) {

      try {

            let user = await enfant.users.fetch(args._hoistedOptions[0].value)
            if(!user) return message.reply("Pas de membre à bannir")
            let member = message.guild.members.cache.get(user.id)

            let reason = args.get("raison").value;
            if(!reason) reason = "Pas de raison fournie.";

            if(message.user.id === user.id) return message.reply("Essaie pas de te bannir !")
            if((await message.guild.fetchOwner()).id === user.id) return message.reply("Ne ban pas le propriétaire du serveur !")
            if(member && !member.bannable) return message.reply("Je ne peut pas bannir ce membre !")
            if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peux pas bannir ce membre !")
            if((await message.guild.bans.fetch()).get(user.id)) return message.reply("Ce membre est déjà ban !")

            try {await user.send(`<:Moderator_Simplified:1023177595728175114>Tu as été banni du serveur ${message.guild.name} par ${message.user.tag} pour la raison : \`${reason}\`<:Moderator_Simplified:1023177595728175114>`)} catch(err) {}

            await message.reply(`<:Moderator_Simplified:1023177595728175114>${message.user} a banni ${user.tag} pour la raison : \`${reason}\`<:Moderator_Simplified:1023177595728175114>`)

            await message.guild.bans.create(user.id, {reason: reason})

        } catch (err) {

            return message.reply("pas de membre a bannir !")
        
        }
    }
}


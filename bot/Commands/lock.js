const Discord = require("discord.js")
const { EmbedBuilder } = require("discord.js")

module.exports = {

    name: "lock",
    description: "Permet de fermée un salon",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "channel",
            name: "salon",
            description: "Le channel a lock",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "La raison du lock",
            required: false,
            autocomplete: false
        }
    ],

    async run(enfant, message, args) {

    let channel = message.user ? message.guild.channels.cache.get(args._hoistedOptions[0].value) : (message.mentions.channels.first() || message.guild.channels.cache.get(args[0]))
    if(!channel) return message.reply("Aucun salon trouvé !")

    let reason = message.user ? args._hoistedOptions.length > 1 ? args._hoistedOptions[1].value : undefined : args.slice(1).join(" ");
    if(!reason) reason = "Aucune raison donnée";

    if(channel.permissionOverwrites.cache.get(message.guild.roles.everyone.id)?.deny.toArray(false).includes("SendMessages")) return message.reply("Ce salon est déjà locké !")

    await channel.permissionOverwrites.edit(message.guild.roles.everyone.id, {
        SendMessages: false
    })

    const lock = new EmbedBuilder()
    .setDescription(`Le salon a été lock avec succès ! \`${reason}\``)
    .setColor(enfant.color)

    await message.reply({embeds: [lock], ephemeral: true})
    /*await channel.send(`Ce salon a été locké par ${message.user ? message.user : message.author} ! \`${reason}\``)*/
    }
}

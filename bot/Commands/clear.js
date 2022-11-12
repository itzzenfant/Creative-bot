const Discord = require("discord.js")
const {EmbedBuilder} = require("discord.js")

module.exports = {

    name: "clear",
    description: "Permet de clear des messages d'un salon",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "number",
            name: "nombre",
            description: "Le nombre de messages à supprimer",
            required: true,
            autocomplete: false
        }, {
            type: "channel",
            name: "salon",
            description: "Le salon à clear",
            required: false,
            autocomplete: false
        }
    ],

    async run(enfant, message, args) {

        const sa = new EmbedBuilder()
        .setColor(enfant.color)
        .setDescription("Le salon n'a pas été trouvé !")

        let channel = args.getChannel("salon")
        if(!channel) channel = message.channel;
        if(channel.id !== message.channel.id && !message.guild.channels.cache.get(channel.id)) return message.reply({embeds: [sa], ephemeral: true})

        const um = new EmbedBuilder()
        .setColor(enfant.color)
        .setDescription("Il me faut un nombre entre `0` et `100` inclus !")

        let number = args.getNumber("nombre")
        if(parseInt(number) <= 0 || parseInt(number) > 100) return message.reply({embeds: [um], ephemeral: true})


        try {

            const sup = new EmbedBuilder()
            .setColor(enfant.color)
            .setDescription(`\`${messages.size}\` message(s) ont été supprimés dans le salon ${channel} !`)

            let messages = await channel.bulkDelete(parseInt(number))

            await message.reply({embeds: [sup], ephemeral: true})

        } catch (err) {

            const nop = new EmbedBuilder()
            .setColor(enfant.color)
            .setDescription("Aucun message n'a été supprimé, ils datent tous de plus de 14 jours !")

            let messages = [...(await channel.messages.fetch()).filter(msg => !msg.interaction && (Date.now() - msg.createdAt) <= 1209600000).values()]
            if(messages.length <= 0) return message.reply({embeds: [nop], ephemeral: true})
            await channel.bulkDelete(messages)

            const quarte = new EmbedBuilder()
            .setColor(enfant.color)
            .setDescription(`Seul \`${messages.length}\` message(s) ont été supprimés, car le reste date de plus de 14 jours !`)

            await message.reply({embeds: [quarte], ephemeral: true})
        }
    }
}
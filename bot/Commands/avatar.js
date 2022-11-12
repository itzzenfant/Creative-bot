const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "avatar",
    description: "Permet d'avoir l'avatar de quelqun",
    permission: "Aucune",
    dm: true,
    category: "Information",
    options: [
        {
        type: "user",
        name: "utlisateur",
        description: "l'utlisateur a avoir l'avatar",
        required: true,
        autocomplete: false
        }
    ],
    
    async run(enfant, message, args) {
        let user = args.getUser(`utlisateur`)
        if(!user) return message.reply("Utlisateur non valide")
        const exampleEmbed = new EmbedBuilder()
        .setColor(enfant.color)
        .setTitle(`${user.username}`)
        .setDescription(`avatar de ${user.tag}`)
       .setTimestamp()
        .setImage(user.displayAvatarURL({size: 512}))
        message.reply({embeds: [exampleEmbed]});
    }

}
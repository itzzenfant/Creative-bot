const Discord = require("discord.js")

module.exports = {

    name: "voicemoveall",
    description: "Permet de move tous les utilisateur dans un channel !",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    category: "Modération",
    options:[
        { 
            type: "channel", 
            name: "salon",
            description: "Le salon a choisir", 
            required: true, 
            autocomplete: false
        }],



    async run(enfant, message, args) {
        const salon = args.getChannel('salon');
        if(!message.member.voice.channel) return message.reply({content: "Vous n'êtes pas sur un canal audio!", ephemeral: true})
        if(message.member.voice.channel.id === salon.id)return message.reply({content: 'Vous êtes deja dans ce channel !', ephemeral: true})
        if (salon.type === 2) {
            message.reply(`Je vous déplace dans ${salon} !`)
            message.guild.channels.cache.get(message.member.voice.channel.id).members.map(member => member.voice.setChannel(salon.id))
        } else {
            console.log(enfant.channels.cache.get(salon.id))
            message.reply(`Veuillez entré un salon vocal!`)
        }
    }
}  
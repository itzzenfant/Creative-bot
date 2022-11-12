const Discord = require("discord.js")
const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js")
 
module.exports = {
 
  name: "command",
  description: "Permet d'afficher les commandes disponibles",
  permission: "Aucune",
  dm: true,
  category: "Information",
  options: [
    {
      type: "string",
      name: "commande",
      description: "La commande à afficher",
      required: false,
      autocomplete: true
    }
  ],
 
  async run(enfant, message, args) {
 
    let command;
    if(args.getString("commande")) {
      command = enfant.commands.get(args.getString("commande"));
      if(!command) return message.reply("Aucune commande trouvée !")
    }
 
    if(!command) {

        let categories = [];
      enfant.commands.forEach(command => {
        if(!categories.includes(command.category)) categories.push(command.category)
      })
 
      let EmbedHelp = new EmbedBuilder()
      .setColor(enfant.color)
      .setTitle(`Voici toutes les commandes`)
      .setDescription(`**Commandes disponibles : \`${enfant.commands.size}\`\nCatégories disponibles : \`${categories.length}\`**`)
      .setTimestamp()
 
      await categories.sort().forEach(async cat => {
        let commands = enfant.commands.filter(cmd => cmd.category === cat)
        EmbedHelp.addFields({name: `${cat}`, value: `${commands.map(cmd => `\`${cmd.name}\` : ${cmd.description}`).join("\n")}`})
      })
 
      await message.reply({embeds: [EmbedHelp], ephemeral: true})
    } else {
 
      let EmbedHelp1 = new EmbedBuilder()
      .setColor(enfant.color)
      .setTitle(`Voici la commande ${command.name}`)
      .setDescription(`> **Nom :** \`${command.name}\`\n> **Description :** \`${command.description}\`\n> **Permission requise :** \`${typeof command.permission !== "bigint" ? command.permission : new Discord.PermissionsBitField(command.permission).toArray(false)}\`\n> **Commande en DM :** \`${command.dm ? "Oui" : "Non"}\`\n> **Catégorie :** \`${command.category}\``)
      .setTimestamp()
 
      await message.reply({embeds: [EmbedHelp1], ephemeral: true})  
    }
  }
}
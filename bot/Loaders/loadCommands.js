const fs = require('fs');

module.exports = async (bot) => {
    for (const file of fs.readdirSync('./Commands/').filter(f => f.endsWith('.js'))) {
        let command = require(`../Commands/${file}`);
        if (!command.name || typeof command.name !== 'string') throw new TypeError(`La commande ${file.slice(0, file.length - 3)}} n'a pas de nom !`);
        bot.commands.set(command.name, command);
        console.log("--------------------------------------");
        console.log(`La command ${file} est chargé avec succès.`);
        console.log("--------------------------------------");
    }
}
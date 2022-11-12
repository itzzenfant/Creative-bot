const fs = require('fs');

module.exports = async (bot) => {
    for (const file of fs.readdirSync('./Events').filter(f => f.endsWith('.js'))) {
        let event = require(`../Events/${file}`);
        bot.on(file.split(".js").join(""), event.bind(null, bot));
        console.log("--------------------------------------");
        console.log(`Evènement: ${file} chargé avec succès.`);
        console.log("--------------------------------------");
    }
}
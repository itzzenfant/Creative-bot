const loadDatabase = require('../Loaders/loadDatabase');
const loadSlashCommand = require('../Loaders/loadSlashCommands');

module.exports = async (enfant, message, interaction, db) => {

    enfant.db = await loadDatabase()
    enfant.db.connect(function (err) {
        if(err) console.log(err)
        console.log("Base de données connectée !")
    })

    const Status = [
        1,
        2,
        3
    ];


    loadSlashCommand(enfant);
    console.log(`${enfant.user.tag} est en ligne.`);
    enfant.user.setStatus('online');
        let i = 0;
        setInterval(function() {
        let activities = [
            `Creative Community`,
            `l'enfant#0972`,
            `${enfant.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} membres`
        ];
        enfant.user.setActivity(activities[i++ % activities.length], { type: Status[Math.floor(Math.random() * Status.length)]})
    }, 5000
)}
module.exports = async (enfant, oldState, newState) => {

    let oldChannel = oldState.channel;
    let newChannel = newState.channel;
    let user = newState.guild.members.cache.get(newState.id).user || oldState.guild.members.cache.get(oldState.id).user;
                          /**le salon du crée ta vocal */
    if (newChannel?.id === "1027995828134092831") {
        let channel = await newChannel.guild.channels.create({ name: `Vocal de ${user.username}`, type: 2 });
        await channel.setParent(newChannel.parentId);
        newState.guild.members.cache.get(newState.id).voice.setChannel(channel);
    }                       /**le category du crée ta vocal *            /**le salon du crée ta vocal */
    if (oldChannel?.parentId === "1027995695610876056" && oldChannel?.id !== "1027995828134092831") {
        if (oldChannel.members.size <= 0) await oldChannel.delete();
    }
}

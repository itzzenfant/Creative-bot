module.exports = async (enfant, oldState, newState) => {
    
    if (oldState) return;
    if (!newState) return;

    const member = newState.member
    if (!member) return;

    if (!oldState && newState){
    const role = newState.guild.roles.cache.get("1029441487555002368")
    if (!role) return;
    member.roles.add(role).catch(() => false)
    }
}
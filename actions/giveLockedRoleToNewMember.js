const {config, debug, client} = require("../utils/bot");
const sendError = require("./notifyError");


module.exports = async function (guildMember) {
    try {
        if (guildMember.guild.id !== config['guildId']) return;
        if (debug) return;

        // role exist
        if (!config['roles']) return;
        const roleId = config['roles']['locked']

        // guild, role, user
        const guild = await client.guilds.cache.get(config['guildId'])
        const targetRole = await guild.roles.cache.get(roleId)
        const targetUser = await guild.members.cache.get(guildMember.user.id)

        // add role
        await targetUser.roles.add(targetRole, 'New member, locked')
    } catch (e) {
        await sendError(e)
    }
}

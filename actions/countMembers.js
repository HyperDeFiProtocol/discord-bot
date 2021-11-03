const {config, client, notifyChannels} = require('../utils/bot')


module.exports = async function () {
    const guildMemberCountChannel = notifyChannels['guildMemberCount']
    if (!guildMemberCountChannel) return;

    const guild = await client.guilds.cache.get(config['guildId'])
    const guildMemberCount = guild.memberCount
    await guildMemberCountChannel.setName(`📊│Users: ${guildMemberCount}`)

    // const tasks = config['roleMemberCount']
    // if (tasks) {
    //     for (const roleName in tasks) {
    //         const channel = await guild.channels.cache.get(tasks[roleName]['channel'])
    //         if (channel) {
    //             const role = await guild.roles.cache.get(tasks[roleName]['roleId'])
    //             await channel.setName(`📊│${roleName}: ${role.members.size}`)
    //         }
    //     }
    // }
}

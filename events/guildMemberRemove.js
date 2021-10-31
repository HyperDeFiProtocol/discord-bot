const builders = require('@discordjs/builders');
const {debug, notifyChannels} = require('../utils/bot')
const sendError = require('../actions/sendError');


const execute = async function (guild) {
    try {
        if (debug) return

        const moderatorChannel = notifyChannels['moderator']
        if (!moderatorChannel) return

        let text = `🚫 ${builders.userMention(guild.user.id)} was ${builders.inlineCode('KICKED OUT')}`

        const fetchedLogs = await guild.guild.fetchAuditLogs({limit: 1, type: 'MEMBER_KICK'})
        const kickLog = fetchedLogs.entries.first()

        if (!kickLog) {
            await moderatorChannel.send(text)
            return
        }
        const {executor, target} = kickLog;

        if (target.id === guild.user.id) {
            text += ` by ${builders.userMention(executor.id)}`
        }

        if (kickLog.reason) {
            text += ` for ${builders.inlineCode(kickLog.reason)}`
        }

        await moderatorChannel.send(text)
    } catch (e) {
        await sendError(e)
    }
}

module.exports = {
    name: 'guildMemberRemove',
    execute,
}

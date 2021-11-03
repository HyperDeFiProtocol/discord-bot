const builders = require('@discordjs/builders');
const {config, debug, notifyChannels} = require('../utils/bot')
const notifyError = require('../actions/notifyError');


const execute = async function (guildMember) {
    try {
        if (guildMember.guild.id !== config['guildId']) return;
        if (debug) return console.log('>>> events/guildMemberRemove', guildMember.user.tag)

        const moderatorChannel = notifyChannels['moderator']
        if (!moderatorChannel) return

        let text = `✈️ ${builders.userMention(guildMember.user.id)}`

        const fetchedLogs = await guildMember.guild.fetchAuditLogs({limit: 1, type: 'MEMBER_KICK'})
        const kickLog = fetchedLogs.entries.first()

        if (!kickLog) {
            text += ` ${builders.inlineCode('LEFT')}`
        } else {
            const {executor, target} = kickLog;

            if (target.id === guildMember.user.id) {
                text += `  was ${builders.inlineCode('KICKED OUT')} by ${builders.userMention(executor.id)}`
                if (kickLog.reason) {
                    text += ` for ${builders.inlineCode(kickLog.reason)}`
                }
            } else {
                text += ` ${builders.inlineCode('LEFT')}`
            }
        }

        await moderatorChannel.send(text)
    } catch (e) {
        await notifyError(e)
    }
}

module.exports = {
    name: 'guildMemberRemove',
    execute,
}

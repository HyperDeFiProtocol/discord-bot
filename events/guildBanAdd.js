const builders = require('@discordjs/builders');
const {debug, notifyChannels} = require('../utils/bot')
const sendError = require('../actions/sendError');


const execute = async function (guildMember) {
    try {
        if (debug) return console.log('>>> events/guildBanAdd', guildMember.user.tag)

        const moderatorChannel = notifyChannels['moderator']
        if (!moderatorChannel) return

        let text = `⛔️ ${builders.userMention(guildMember.user.id)} was ${builders.inlineCode('BANNED')}`

        const fetchedLogs = await guildMember.guild.fetchAuditLogs({limit: 1, type: 'MEMBER_BAN_ADD'})
        const banLog = fetchedLogs.entries.first()

        if (!banLog) {
            await moderatorChannel.send(text)
            return
        }
        const {executor, target} = banLog;

        if (target.id === guildMember.user.id) {
            text += ` by ${builders.userMention(executor.id)}`
        }

        if (banLog.reason) {
            text += ` for ${builders.inlineCode(banLog.reason)}`
        }

        await moderatorChannel.send(text)
    } catch (e) {
        await sendError(e)
    }
}

module.exports = {
    name: 'guildBanAdd',
    execute,
}

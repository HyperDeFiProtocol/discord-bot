const builders = require('@discordjs/builders');
const {config, notifyChannels} = require('../utils/bot')
const fn = require('../utils/functions')
const sendError = require('../actions/sendError');


const execute = async function (message) {
    if (message.author.bot) return;
    if (!message.guild) return;

    try {
        if (config['debug']) return

        const moderatorChannel = notifyChannels['moderator']
        if (!moderatorChannel) return

        let text = `a message by ${builders.userMention(message.author.id)} in ${builders.channelMention(message.channelId)}`

        await fn.wait()
        const deletionLogs = await message.guild.fetchAuditLogs({limit: 1, type: 'MESSAGE_DELETE'})
        const deletionLog = deletionLogs.entries.first()
        if (!deletionLog) {
            text += ` was deleted`
            await moderatorChannel.send(`❌ ${fn.titleCase(text)}`)
            return
        }
        const {executor, target} = deletionLog;

        if (target.id === message.author.id) {
            text = `${builders.userMention(executor.id)} ${builders.inlineCode('DELETED')} ` + text
        } else {
            text += ` was ${builders.inlineCode('DELETED')}`
        }

        text += ` :: ${message.content}`

        await moderatorChannel.send(`❌ ${fn.titleCase(text)}`)
    } catch (e) {
        await sendError(e)
    }
}

module.exports = {
    name: 'messageDelete',
    execute,
}

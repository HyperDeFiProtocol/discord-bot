const builders = require('@discordjs/builders');
const {config, notifyChannels} = require('../utils/bot')
const fn = require('../utils/functions')
const sendError = require('../actions/sendError');


const execute = async function (message) {
    if (message.author.bot) return;
    if (!message.guild) return;

    try {
        // if (config['debug']) return

        const moderatorChannel = notifyChannels['moderator']
        if (!moderatorChannel) return

        let text = `❌ A message by ${builders.userMention(message.author.id)} in ${builders.channelMention(message.channelId)}`
            + ` was ${builders.inlineCode('DELETED')} :: ${message.content}`

        await fn.wait()
        const deletionLogs = await message.guild.fetchAuditLogs({limit: 1, type: 'MESSAGE_DELETE'})
        const deletionLog = deletionLogs.entries.first()
        if (!deletionLog) {
            await moderatorChannel.send(text)
            return
        }
        const {executor, target} = deletionLog;

        if (target.id === message.author.id) {
            text += `\n\n`
                + `executor: ${builders.userMention(executor.id)}`
        }

        await moderatorChannel.send(text)
    } catch (e) {
        await sendError(e)
    }
}

module.exports = {
    name: 'messageDelete',
    execute,
}

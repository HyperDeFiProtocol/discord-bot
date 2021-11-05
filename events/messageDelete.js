const builders = require('@discordjs/builders');
const {config, debug, notifyChannels} = require('../utils/bot');
const {sendError} = require("../actions/notify");


const execute = async function (message) {
    try {
        if (!message.author) return;
        if (message.author.bot) return;
        if (!message.guild) return;
        if (debug) console.log('>>> events/messageDelete')

        if (config['notifyChannels']['welcome'] && config['notifyChannels']['welcome'] === message.channelId) {
            console.log('deleted in welcome')
            return
        }

        const moderatorChannel = notifyChannels['moderator']
        if (!moderatorChannel) return

        let text = `🗑️ A message by ${builders.userMention(message.author.id)}`
            + ` in ${builders.channelMention(message.channelId)}`
            + ` was ${builders.inlineCode('DELETED')}`
        if (message.content) {
            text += ` ::\n\n`
                + message.content
        }

        const fetchedLogs = await message.guild.fetchAuditLogs({limit: 1, type: 'MESSAGE_DELETE'})
        if (!fetchedLogs) return;

        const deletionLog = fetchedLogs.entries.first()
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

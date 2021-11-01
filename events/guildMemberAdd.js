const builders = require('@discordjs/builders');
const {config, debug, notifyChannels} = require('../utils/bot')
const sendError = require('../actions/sendError');


const execute = async function (guildMember) {
    try {
        if (guildMember.guild.id !== config['guildId']) return;
        if (debug) return console.log('>>> events/guildMemberAdd')

        const moderatorChannel = notifyChannels['moderator']
        if (!moderatorChannel) return

        console.log(guildMember)

        const text = `🍄 ${builders.userMention(guildMember.user.id)}`
            + ` ${builders.inlineCode('JOINED')}`
        await moderatorChannel.send(text)
    } catch (e) {
        await sendError(e)
    }
}

module.exports = {
    name: 'guildMemberAdd',
    execute,
}

const moment = require("moment");
const builders = require('@discordjs/builders');
const {config, notifyChannels} = require('../utils/bot')
const sendError = require('../actions/sendError');


const execute = async function (guildMember) {
    try {
        if (guildMember.guild.id !== config['guildId']) return;

        const moderatorChannel = notifyChannels['moderator']
        if (!moderatorChannel) return

        console.log(guildMember)

        const text = `🍄 ${builders.userMention(guildMember.user.id)}`
            + ` ${builders.inlineCode('JOINED')}`
            + ` at ${builders.inlineCode(moment(guildMember.joinedTimestamp).toString())}`
        await moderatorChannel.send(text)
    } catch (e) {
        await sendError(e)
    }
}

module.exports = {
    name: 'guildMemberAdd',
    execute,
}

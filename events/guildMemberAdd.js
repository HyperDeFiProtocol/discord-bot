const builders = require('@discordjs/builders');
const {config, debug, notifyChannels} = require('../utils/bot')
const giveLockedRoleToNewMember = require('../actions/giveLockedRoleToNewMember');
const notifyWelcomePic = require('../actions/notifyWelcomePic');
const countMembers = require('../actions/countMembers');
const {sendError} = require("../actions/notify");

const execute = async function (guildMember) {
    try {
        if (guildMember.guild.id !== config['guildId']) return;
        await countMembers()

        // if (debug) return console.log('>>> events/guildMemberAdd')
        console.log('>>> events/guildMemberAdd')

        const moderatorChannel = notifyChannels['moderator']
        if (moderatorChannel) {
            const text = `🍄 ${builders.userMention(guildMember.user.id)}`
                + ` ${builders.inlineCode('JOINED')}`
            await moderatorChannel.send(text)
        }

        await notifyWelcomePic(guildMember.user)
        await giveLockedRoleToNewMember(guildMember)
    } catch (e) {
        await sendError(e)
    }
}

module.exports = {
    name: 'guildMemberAdd',
    execute,
}

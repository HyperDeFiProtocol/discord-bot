const builders = require('@discordjs/builders');
const {config, debug, notifyChannels} = require('../utils/bot')
const notifyError = require('../actions/notifyError');
const giveLockedRoleToNewMember = require('../actions/giveLockedRoleToNewMember');
const notifyWelcomePic = require('../actions/notifyWelcomePic');
const countMembers = require('../actions/countMembers');

const execute = async function (guildMember) {
    try {
        if (guildMember.guild.id !== config['guildId']) return;
        await countMembers()

        if (debug) return console.log('>>> events/guildMemberAdd')

        const moderatorChannel = notifyChannels['moderator']
        if (moderatorChannel) {
            const text = `🍄 ${builders.userMention(guildMember.user.id)}`
                + ` ${builders.inlineCode('JOINED')}`
            await moderatorChannel.send(text)
        }


        await notifyWelcomePic(guildMember.user)

        // console.log(guildMember.user.displayAvatarURL())

        await giveLockedRoleToNewMember(guildMember)
    } catch (e) {
        await notifyError(e)
    }
}

module.exports = {
    name: 'guildMemberAdd',
    execute,
}

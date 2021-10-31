const builders = require('@discordjs/builders');
const {debug, notifyChannels} = require('../utils/bot');
const reactionRulesAllMatched = require('../functions/reactionRulesAllMatched')


module.exports = async function (reaction, user) {
    if (debug) return;

    // match
    let reactionUser
    let targetRole
    [reactionUser, targetRole] = await reactionRulesAllMatched(reaction, user)

    if (!reactionUser) return;

    // remove role
    await reactionUser.roles.remove(targetRole, 'Rules Disagreed')

    // notify to moderator channel
    const moderatorChannel = notifyChannels['moderator']
    if (!moderatorChannel) return;
    await moderatorChannel.send(`💔 ${reactionUser}`
        + ` ${builders.inlineCode('DISAGREED')} with the ${builders.channelMention(reaction.message.channelId)}`)
}

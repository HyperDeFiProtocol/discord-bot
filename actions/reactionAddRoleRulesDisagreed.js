const builders = require('@discordjs/builders');
const {debug, notifyChannels} = require('../utils/bot');
const reactionRulesAllMatched = require('../functions/reactionRulesAllMatched')


module.exports = async function (reaction, user) {
    if (debug) return;

    // match
    let reactionUser
    let agreedRole
    let initRole
    [reactionUser, agreedRole, initRole] = await reactionRulesAllMatched(reaction, user)

    if (!reactionUser) return;
    if (agreedRole) await reactionUser.roles.remove(agreedRole, 'Rules Disagreed')
    if (initRole) await reactionUser.roles.add(initRole, 'Rules Disagreed')

    // notify to moderator channel
    const moderatorChannel = notifyChannels['moderator']
    if (!moderatorChannel) return;
    await moderatorChannel.send(`💔 ${reactionUser}`
        + ` ${builders.inlineCode('DISAGREED')} with the ${builders.channelMention(reaction.message.channelId)}`)
}

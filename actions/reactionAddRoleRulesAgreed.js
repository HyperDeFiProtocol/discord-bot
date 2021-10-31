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

    // add role
    await reactionUser.roles.add(targetRole, 'Rules Agreed')

    // notify to moderator channel
    const moderatorChannel = notifyChannels['moderator']
    if (!moderatorChannel) return;
    await moderatorChannel.send(`${reaction.emoji.name} ${reactionUser}`
        + ` ${builders.inlineCode('AGREED')} with the ${builders.channelMention(reaction.message.channelId)}`)
}

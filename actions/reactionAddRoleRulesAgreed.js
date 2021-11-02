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
    if (agreedRole) await reactionUser.roles.add(agreedRole, 'Rules Agreed')
    if (initRole) await reactionUser.roles.remove(initRole, 'Rules Agreed')

    // notify to moderator channel
    const moderatorChannel = notifyChannels['moderator']
    if (!moderatorChannel) return;
    await moderatorChannel.send(`${reaction.emoji.name} ${reactionUser}`
        + ` ${builders.inlineCode('AGREED')} with the ${builders.channelMention(reaction.message.channelId)}`)
}

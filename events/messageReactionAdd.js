const {config} = require('../utils/bot')
const sendError = require('../actions/sendError');
const reactionAddRoleRulesAgreed = require('../actions/reactionAddRoleRulesAgreed')


const execute = async function (reaction, user) {
    try {
        if (reaction.message.guildId !== config['guildId']) return;
        if (user.bot) return;
        if (reaction.partial) await reaction.fetch();

        await reactionAddRoleRulesAgreed(reaction, user)
    } catch (e) {
        await sendError(e)
    }
}

module.exports = {
    name: 'messageReactionAdd',
    execute,
}

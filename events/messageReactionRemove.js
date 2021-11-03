const {config} = require('../utils/bot')
const notifyError = require('../actions/notifyError');
const reactionAddRoleRulesDisagreed = require('../actions/reactionAddRoleRulesDisagreed')


const execute = async function (reaction, user) {
    try {
        if (reaction.message.guildId !== config['guildId']) return;
        if (user.bot) return;
        if (reaction.partial) await reaction.fetch();

        await reactionAddRoleRulesDisagreed(reaction, user)
    } catch (e) {
        await notifyError(e)
    }
}

module.exports = {
    name: 'messageReactionRemove',
    execute,
}

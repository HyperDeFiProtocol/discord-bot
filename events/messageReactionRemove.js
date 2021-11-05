const {config} = require('../utils/bot')
const reactionAddRoleRulesDisagreed = require('../actions/reactionAddRoleRulesDisagreed')
const {sendError} = require("../actions/notify");


const execute = async function (reaction, user) {
    try {
        if (reaction.message.guildId !== config['guildId']) return;
        if (user.bot) return;
        if (reaction.partial) await reaction.fetch();

        await reactionAddRoleRulesDisagreed(reaction, user)
    } catch (e) {
        await sendError(e)
    }

}

module.exports = {
    name: 'messageReactionRemove',
    execute,
}

const {debug} = require('../utils/bot')
const notifyRoleChanged = require('../actions/notifyRoleChanged');
const sendError = require('../actions/sendError');


const execute = async function (oldMember, newMember) {
    try {
        if (debug) return console.log('... guildMemberUpdate')

        await notifyRoleChanged(oldMember, newMember)
    } catch (e) {
        await sendError(e)
    }
}

module.exports = {
    name: 'guildMemberUpdate',
    execute,
}

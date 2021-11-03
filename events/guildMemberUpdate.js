const {debug} = require('../utils/bot')
const notifyRoleChanged = require('../actions/notifyRoleChanged');
const notifyError = require('../actions/notifyError');


const execute = async function (oldMember, newMember) {
    try {
        if (debug) return console.log('... guildMemberUpdate')

        await notifyRoleChanged(oldMember, newMember)
    } catch (e) {
        await notifyError(e)
    }
}

module.exports = {
    name: 'guildMemberUpdate',
    execute,
}
